import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { quizQuestionStatusEnum } from '../utils/helpers';
import { answerQuestion } from '../actions/index';
import { startQuiz } from '../actions/index';

class Quiz extends Component {
  state = {
    showAnswer: false
  }

  toDetail = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckDetail',
          params: { deckTitle: this.props.deckTitle }
        })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  showAnswer = () => {
    this.setState({ showAnswer: true });
  }

  hideAnswer = () => {
    this.setState({ showAnswer: false });
  }

  correctAnswer = () => {
    this.answerQuestion(quizQuestionStatusEnum.Correct);
  }

  incorrectAnswer = () => {
    this.answerQuestion(quizQuestionStatusEnum.Incorrect);
  }

  answerQuestion = (status) => {
    const { deckTitle, card, dispatch, navigation } = this.props;
    dispatch(answerQuestion(card, status));
    navigation.navigate(
      'Quiz',
      {
        deckTitle: deckTitle
      }
    );
  }

  restartQuiz = () => {
    const { deckTitle, navigation, dispatch } = this.props;
    dispatch(startQuiz(deckTitle));
    navigation.navigate(
      'Quiz',
      {
        deckTitle: deckTitle
      }
    );
  }

  render() {
    const { showAnswer } = this.state;
    const { card, correctAnswers, incorrectAnswers, cards } = this.props;
    const currentQuestion = (correctAnswers ? correctAnswers.length : 0) + (incorrectAnswers ? incorrectAnswers.length : 0) + 1;

    if (!card) {
      return (
        <View style={styles.item}>
          {cards.length > 0 && (
            <View>
              <Text style={styles.mainText}>Congratulations, you've completed the Quiz!</Text>
              <Text style={styles.result}>Your result is {correctAnswers ? correctAnswers.length : 0} out of {cards ? cards.length : 0}</Text>
            </View>
          )}
          {cards.length === 0 && (
            <View>
              <Text style={styles.mainText}>You can't start quiz! Add card first</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.iosBackToDetailBtn}
            onPress={this.toDetail}>
            <Text style={styles.iosBackToDetailBtnText}>BACK TO DETAIL</Text>
          </TouchableOpacity>
          {cards.length > 0 && (
            <TouchableOpacity
              style={styles.iosRestartQuizBtn}
              onPress={this.restartQuiz}>
              <Text style={styles.iosRestartQuizBtnText}>RESTART QUIZ</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return (
      <View style={styles.item}>
        <Text style={styles.count}>{currentQuestion}/{cards.length}</Text>
        {!showAnswer && <Text style={styles.mainText}>{card.question}</Text>}
        {showAnswer && <Text style={styles.mainText}>{card.answer}</Text>}
        <TouchableWithoutFeedback
          style={styles.iosAnswerBtn}
          onPressIn={this.showAnswer}
          onPressOut={this.hideAnswer}>
          <View style={styles.iosAnswerBtn}>
            <Text style={styles.iosAnswerBtnText}>Answer</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={styles.iosCorrectBtn}
          onPress={this.correctAnswer}>
          <Text style={styles.iosCorrectBtnText}>CORRECT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iosIncorrectBtn}
          onPress={this.incorrectAnswer}>
          <Text style={styles.iosIncorrectBtnText}>INCORRECT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'azure',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iosAnswerBtn: {
    marginTop: 40
  },
  iosAnswerBtnText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center'
  },
  count: {
    fontSize: 20,
    color: 'grey'
  },
  mainText: {
    marginTop: 25,
    fontSize: 40,
    textAlign: 'center'
  },
  result: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 25
  },
  iosCorrectBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    height: 45,
    width: 200,
    marginTop: 45
  },
  iosCorrectBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  iosIncorrectBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    height: 45,
    width: 200,
    marginTop: 45
  },
  iosIncorrectBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  iosBackToDetailBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 45,
    width: 200,
    marginTop: 45
  },
  iosBackToDetailBtnText: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center'
  },
  iosRestartQuizBtn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 45,
    width: 200,
    marginTop: 45
  },
  iosRestartQuizBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckTitle } = navigation.state.params;

  return {
    deckTitle,
    cards: state.quizQuestions,
    card: state.quizQuestions.find((card) =>
      card.status === quizQuestionStatusEnum.NotAnswered),
    correctAnswers: state.quizQuestions.filter((card) =>
      card.status === quizQuestionStatusEnum.Correct),
    incorrectAnswers: state.quizQuestions.filter((card) =>
      card.status === quizQuestionStatusEnum.Incorrect),
  };
}

export default connect(mapStateToProps)(Quiz);
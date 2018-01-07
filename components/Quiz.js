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
    const { card, correctAnswers, cards } = this.props;

    if (!card) {
      return (
        <View>
          <Text>Congratulations, you've completed the Quiz!</Text>
          <Text>Your result is {correctAnswers ? correctAnswers.length : 0} out of {cards ? cards.length : 0}</Text>
          <TouchableOpacity
            onPress={this.toDetail}>
            <Text>BACK TO DETAIL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.restartQuiz}>
            <Text>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View>
        {!showAnswer && <Text>{card.question}</Text>}
        {showAnswer && <Text>{card.answer}</Text>}
        <TouchableWithoutFeedback
          onPress={this.showAnswer}
          onPressOut={this.hideAnswer}>
          <View>
            <Text>Answer</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={this.correctAnswer}>
          <Text>CORRECT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.incorrectAnswer}>
          <Text>INCORRECT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { quizQuestionStatusEnum } from '../utils/helpers';
import { answerQuestion } from '../actions/index';

class Quiz extends Component {
  state = {
    showAnswer = false
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
    this.state({ showAnswer: true });
  }

  hideAnswer = () => {
    this.state({ showAnswer: false });
  }

  correctAnswer = () => {
    answerQuestion(quizQuestionStatusEnum.Correct);
  }

  incorrectAnswer = () => {
    answerQuestion(quizQuestionStatusEnum.Incorrect);
  }

  answerQuestion = (status) => {
    const { deckTitle, card, dispatch } = this.props;
    dispatch(answerQuestion(card, status));
    navigation.navigate(
      'Quiz',
      {
        deckTitle: deckTitle
      }
    );
  }

  render() {
    const { showAnswer } = this.state;
    const { card } = this.props;

    if (!card) {
      return (
        <View>
          <Text>No more question.</Text>
          <TouchableOpacity
            onPress={this.toDetail}>
            <Text>BACK TO DETAIL</Text>
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
          <Text>Answer</Text>
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
    card: state.quizQuestions.find((card) =>
      card.status === quizQuestionStatusEnum.NotAnswered)
  };
}

export default connect(mapStateToProps)(Quiz);
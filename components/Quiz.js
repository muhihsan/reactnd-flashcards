import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { quizQuestionStatusEnum } from '../utils/helpers';
import { answerQuestion } from '../actions/index';

class Quiz extends Component {
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

  correctAnswer = () => {
    answerQuestion(quizQuestionStatusEnum.Correct);
  }

  incorrectAnswer = () => {
    answerQuestion(quizQuestionStatusEnum.Incorrect);
  }

  answerQuestion = (status) => {
    const { question, dispatch } = this.props;
    dispatch(answerQuestion(question, status));
    navigation.navigate(
      'Quiz',
      {
        deckTitle: deck.title
      }
    );
  }

  render() {
    const { question } = this.props;

    if (!question) {
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
        <Text>{JSON.stringify(this.props.question)}</Text>
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
    question: state.quizQuestions.find((question) =>
      question.status === quizQuestionStatusEnum.NotAnswered)
  };
}

export default connect(mapStateToProps)(Quiz);
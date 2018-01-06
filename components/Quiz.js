import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { quizQuestionStatusEnum } from '../utils/helpers';
import { answerQuestion } from '../actions/index';

class Quiz extends Component {
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
  return {
    question: state.quizQuestions.find((question) =>
      question.status === quizQuestionStatusEnum.NotAnswered)
  };
}

export default connect(mapStateToProps)(Quiz);
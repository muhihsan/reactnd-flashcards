import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { quizQuestionStatusEnum } from '../utils/helpers';

class Quiz extends Component {
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props.question)}</Text>
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
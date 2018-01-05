import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Quiz extends Component {
  componentDidMount

  render() {
    return (
      <View>
        <Text>This is quiz</Text>
      </View>
    );
  }
}

export default connect()(Quiz);
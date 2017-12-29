import React, { Component } from 'react';
import { View, Text } from 'react-native';

class AddCard extends Component {
  static navigationOptions = () => {
    return {
      title: 'Add Card'
    };
  }

  render() {
    return (
      <View>
        <Text>Add Card Component</Text>
      </View>
    );
  }
}

export default AddCard;
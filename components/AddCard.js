import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class AddCard extends Component {
  static navigationOptions = () => {
    return {
      question: '',
      answer: ''
    };
  }

  render() {
    return (
      <View style={styles.item}>
        <TextInput style={styles.input} onChangeText={(question) => this.setState({ question })} />
        <TextInput style={styles.input} onChangeText={(answer) => this.setState({ answer })} />
        <Text>Submit</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginTop: 17
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default AddCard;
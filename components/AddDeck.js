import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  render() {
    return (
      <View style={styles.item}>
        <Text>What is the title of your new deck?</Text>
        <TextInput style={styles.input} onChangeText={(deckTitle) => this.setState({ deckTitle })} />
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

export default AddDeck;
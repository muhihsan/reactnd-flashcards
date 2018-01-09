import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { addCardToDeck } from '../utils/api';
import { addCard } from '../actions/index';

class AddCard extends Component {
  static state = {
    question: '',
    answer: ''
  }

  static navigationOptions = () => {
    return {
      title: 'Add Card'
    };
  }

  toDeckDetail = (deckTitle) => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckDetail',
          params: { deckTitle: deckTitle }
        })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  submit = () => {
    const self = this;
    const { question, answer } = this.state;
    const { deckTitle } = this.props.navigation.state.params;
    const card = {
      question: question,
      answer: answer
    };

    addCardToDeck(deckTitle, card).then(() => {
      self.props.dispatch(addCard(deckTitle, card));
      self.toDeckDetail(deckTitle);
    });
  }

  render() {
    return (
      <View style={styles.item}>
        <Text style={styles.question}>Your question and answer?</Text>
        <TextInput
          style={styles.input}
          placeholder="Question"
          onChangeText={(question) => this.setState({ question })} />
        <TextInput
          style={styles.input}
          placeholder="Answer"
          onChangeText={(answer) => this.setState({ answer })} />
        <TouchableOpacity
          style={styles.iosSubmitBtn}
          onPress={this.submit}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginTop: 22,
    backgroundColor: 'azure',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  question: {
    fontSize: 50
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 25,
    borderRadius: 10,
    width: 250
  },
  iosSubmitBtn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    height: 45,
    width: 200,
    marginTop: 25
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
});

export default connect()(AddCard);
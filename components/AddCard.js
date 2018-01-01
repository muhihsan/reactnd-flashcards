import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
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

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: this.props.navigation.state.params.deckDetailKey
    }));
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
      self.toHome();
    });
  }

  render() {
    return (
      <View style={styles.item}>
        <TextInput style={styles.input} onChangeText={(question) => this.setState({ question })} />
        <TextInput style={styles.input} onChangeText={(answer) => this.setState({ answer })} />
        <TouchableOpacity
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
          onPress={this.submit}>
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
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
  },
  iosSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
});

export default connect()(AddCard);
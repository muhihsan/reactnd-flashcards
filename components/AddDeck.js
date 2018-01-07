import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions/index';

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  toDeckDetail = () => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckDetail',
          params: { deckTitle: this.state.deckTitle }
        })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }

  submit = () => {
    const self = this;
    const { deckTitle } = this.state;
    saveDeckTitle(deckTitle).then(() => {
      self.props.dispatch(addDeck(deckTitle));
      self.toDeckDetail();
    });
  }

  render() {
    return (
      <View style={styles.item}>
        <Text style={styles.question}>What is the title of your new deck?</Text>
        <TextInput style={styles.input} onChangeText={(deckTitle) => this.setState({ deckTitle })} />
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
    backgroundColor: 'azure'
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
    marginLeft: 20,
    marginRight: 20,
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

export default connect()(AddDeck);
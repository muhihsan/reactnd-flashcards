import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions/index';

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddDeck'
    }));
  }

  submit = () => {
    const self = this;
    const { deckTitle } = this.state;
    saveDeckTitle(deckTitle).then(() => {
      self.props.dispatch(addDeck(deckTitle));
      self.toHome();
    });
  }

  render() {
    return (
      <View style={styles.item}>
        <Text>What is the title of your new deck?</Text>
        <TextInput style={styles.input} onChangeText={(deckTitle) => this.setState({ deckTitle })} />
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
  },
});

export default connect()(AddDeck);
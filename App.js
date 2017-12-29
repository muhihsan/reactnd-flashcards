import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Decks />
        <AddDeck />
      </View>
    );
  }
}
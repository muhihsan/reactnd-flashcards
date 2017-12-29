import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Decks />
        <NewDeck />
      </View>
    );
  }
}
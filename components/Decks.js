import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { getDecks, addCardToDeck } from '../utils/api';
import { createCard } from '../utils/helpers';

class Decks extends Component {
  state = {
    ready: false,
    decks: null
  }

  componentDidMount() {
    var self = this;
    addCardToDeck("JavaScript", createCard(
      "Does React Nanodegree teach you JavaScript",
      "Yes, totally!"
    )).then(() => {
      getDecks()
        .then((decks) => {
          self.setState({ decks });
        });
    });
  }

  render() {
    const { decks } = this.state;
    console.log(decks);

    return (
      <View>
        {decks && decks.map((deck) => (
          <View key={deck.title} style={styles.item}>
            <Text>{JSON.stringify(deck)}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});

export default Decks;
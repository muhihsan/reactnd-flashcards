import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
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

    return (
      <View style={styles.items}>
        {decks && decks.map((deck) => (
          <TouchableOpacity
            key={deck.title}
            style={styles.item}
            onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deckTitle: deck.title }
            )}>
            <Text>{deck.title}</Text>
            <Text>{deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    marginTop: 10
  },
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
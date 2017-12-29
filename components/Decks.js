import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getDecks, addCardToDeck } from '../utils/api';
import { createCard } from '../utils/helpers';

class Decks extends Component {
  state = {
    ready: false,
    decks: null
  }

  componentDidMount() {
    var self = this;
    addCardToDeck("React", createCard(
      "Is this React Nanodegree worth it",
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
      <View>
        <Text>Decks Component</Text>
        <Text>{JSON.stringify(decks)}</Text>
      </View>
    );
  }
}

export default Decks;
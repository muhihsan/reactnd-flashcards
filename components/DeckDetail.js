import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { getDeck } from '../utils/api';

class DeckDetail extends Component {
  state = {
    ready: false,
    deck: null
  }

  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;
    return {
      title: deckTitle
    };
  }

  componentDidMount() {
    const self = this;
    const { deckTitle } = this.props.navigation.state.params;
    getDeck(deckTitle)
      .then((deck) => (
        self.setState({
          ready: true,
          deck
        }))
      );
  }

  render() {
    const { ready, deck } = this.state;

    if (!ready) {
      return <AppLoading />
    }

    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}</Text>
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { deckTitle: deck.title }
            )}>
            <Text>Add Card</Text>
          </TouchableOpacity>
        <Text>Start Quiz</Text>
      </View>
    );
  }
}

export default DeckDetail;
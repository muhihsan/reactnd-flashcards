import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { getDeck } from '../utils/api';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;
    return {
      title: deckTitle
    };
  }

  render() {
    const { deck } = this.props;

    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            {
              deckTitle: deck.title,
              deckDetailKey: this.props.navigation.state.key
            }
          )}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(
            'Quiz',
            {
              deckTitle: deck.title
            }
          )}>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckTitle } = navigation.state.params;

  return {
    deckTitle,
    deck: state.decks.find((deck) => deck.title === deckTitle)
  };
}

export default connect(mapStateToProps)(DeckDetail);
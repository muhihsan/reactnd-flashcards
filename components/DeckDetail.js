import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;

    return {
      title: deckTitle
    };
  }

  render() {
    return (
      <View>
        <Text>Deck Detail Component</Text>
      </View>
    );
  }
}

export default DeckDetail;
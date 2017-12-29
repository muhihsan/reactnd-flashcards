import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmark' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'black' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'black',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Tabs />
      </View>
    );
  }
}
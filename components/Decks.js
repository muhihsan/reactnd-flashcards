import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries } from '../actions';
import { getDecks, addCardToDeck } from '../utils/api';
import { createCard } from '../utils/helpers';

class Decks extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    var self = this;
    const { dispatch } = self.props;
    getDecks()
      .then((decks) => dispatch(receiveEntries(decks)))
      .then(({ decks }) => {
        self.setState({ ready: true });
      });
  }

  keyExtractor = (item, index) => item.title;

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.title}
        style={styles.item}
        onPress={() => this.props.navigation.navigate(
          'DeckDetail',
          { deckTitle: item.title }
        )}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.deck}>{item.questions.length} card{item.questions.length > 1 ? 's' : ''}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { decks } = this.props;

    return (
      <View style={styles.items}>
        {decks && JSON.stringify(decks) !== '{}' &&
          <FlatList
            data={decks}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    marginTop: 22,
    backgroundColor: 'azure'
  },
  item: {
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  title: {
    fontSize: 22,
    textAlign: 'center'
  },
  deck: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    color: 'grey'
  }
});

function mapStateToProps(entries) {
  return {
    decks: entries.decks
  };
}

export default connect(mapStateToProps)(Decks);
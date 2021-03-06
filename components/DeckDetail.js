import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { getDeck } from '../utils/api';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { startQuiz } from '../actions/index';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;
    return {
      title: deckTitle
    };
  }

  startQuiz = () => {
    const { deck, navigation, dispatch } = this.props;
    dispatch(startQuiz(deck.title));
    clearLocalNotification()
      .then(setLocalNotification);
    navigation.navigate(
      'Quiz',
      {
        deckTitle: deck.title
      }
    );
  }

  render() {
    const { deck } = this.props;

    if (!deck) {
      return (<View></View>);
    }

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.deck}>{deck.questions.length} card{deck.questions.length > 1 ? 's' : ''}</Text>
        <TouchableOpacity
          style={styles.iosAddCardBtn}
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            {
              deckTitle: deck.title,
              deckDetailKey: this.props.navigation.state.key
            }
          )}>
          <Text style={styles.iosAddCardBtnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iosStartQuizBtn}
          onPress={this.startQuiz}>
          <Text style={styles.iosStartQuizBtnText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'azure',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40
  },
  deck: {
    marginTop: 50,
    fontSize: 20,
    color: 'grey'
  },
  iosAddCardBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 45,
    width: 200,
    marginTop: 45
  },
  iosAddCardBtnText: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center'
  },
  iosStartQuizBtn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    height: 45,
    width: 200,
    marginTop: 45
  },
  iosStartQuizBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckTitle } = navigation.state.params;
debugger;
  return {
    deckTitle,
    deck: state.decks.find((deck) => deck.title === deckTitle)
  };
}

export default connect(mapStateToProps)(DeckDetail);
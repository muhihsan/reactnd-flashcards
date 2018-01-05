export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const START_QUIZ = 'START_QUIZ';

export function receiveEntries(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    deck: {
      title,
      card
    }
  };
}

export function startQuiz(title) {
  return {
    type: START_QUIZ,
    title
  };
}
import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions';

function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        decks: [...action.decks]
      };
    case ADD_DECK:
      if (state.decks && state.decks.find(deck => deck.title === action.title)) {
        return state;
      }
      return {
        ...state,
        decks: [
          ...state.decks,
          {
            title: action.title,
            questions: []
          }
        ]
      };
    case ADD_CARD:
      if (!state.decks) {
        return state;
      }
      const existingDeck = state.decks.find(deck => deck.title === action.deck.title);
      if (!existingDeck) {
        return state;
      }
      const newState = {
        ...state,
        decks: [
          ...state.decks
        ]
      };
      const existingDeckFromNewState = newState.decks.find(deck => deck.title === action.deck.title);
      existingDeckFromNewState.questions.push(action.deck.card);
      return newState;
    default:
      return state;
  }
}

export default entries;
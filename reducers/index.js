import { RECEIVE_DECKS, ADD_DECK } from '../actions';

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
    default:
      return state;
  }
}

export default entries;
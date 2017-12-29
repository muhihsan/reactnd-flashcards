import { RECEIVE_DECKS, ADD_ENTRY } from '../actions';

function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        decks: [...action.decks]
      };
    default:
      return state;
  }
}

export default entries;
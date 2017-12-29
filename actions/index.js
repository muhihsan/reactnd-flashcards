export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export function receiveEntries(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}
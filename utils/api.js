import { AsyncStorage } from 'react-native';
import { getDecksWithoutKeys } from './helpers';

const FLASHCARDS_STORAGE_KEY = 'FlashCards:decks'

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => getDecksWithoutKeys(JSON.parse(result)));
}

export function getDeck(title) {
  return getDecks().then((decks) => {
    return (decks && decks[title]) ? decks[title] : null;
  });
}

export function saveDeckTitle(title) {
  getDeck(title).then((deck) => {
    if (!deck) {
      return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
          title: title,
          questions: []
        }
      }));
    }
  });
}

export function addCardToDeck(title, card) {
  return getDeck(title).then((deck) => {
    if (deck) {
      return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [deck.title]: {
          title: deck.title,
          questions: [...deck.questions, card]
        }
      }));
    }
    else {
      return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
          title: title,
          questions: [card]
        }
      }));
    }
  });
}
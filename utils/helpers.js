export function createCard(question, answer) {
  return {
    question: question,
    answer: answer
  };
}

export function getDecksWithoutKeys(decks) {
  const keys = Object.keys(decks);
  return keys.map((key) => {
    return decks[key];
  });
}

export const quizQuestionStatusEnum = {
  NotAnswered: 0,
  Correct: 1,
  Incorrect: 2
}
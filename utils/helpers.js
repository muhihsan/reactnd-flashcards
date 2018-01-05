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

export function shuffleQuestions(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}
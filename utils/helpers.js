import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

export function createCard(question, answer) {
  return {
    question: question,
    answer: answer
  };
}

export function getDecksWithoutKeys(decks) {
  if (!decks) {
    return [];
  }
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

const NOTIFICATION_KEY = 'FlashCards:notifications';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Start a quiz!',
    body: 'Don\'t forget to start a quiz today!',
    ios: {
      sound: true
    }
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}
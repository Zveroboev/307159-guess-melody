const FAIL_MESSAGE_TIME = `Время вышло! Вы не успели отгадать все мелодии`;
const FAIL_MESSAGE_LIVES = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;

const winMessage = (position, sumPlayers, percent) => {
  return `Вы заняли ${position} место из ${sumPlayers} игроков. Это лучше, чем у ${percent}% игроков`;
};

export default (results, playerResult) => {
  const newResults = [...results];
  const {scores, lives, time} = playerResult;

  if (lives < 0) {
    return FAIL_MESSAGE_LIVES;
  }

  if (time <= 0) {
    return FAIL_MESSAGE_TIME;
  }

  newResults.push(scores);
  newResults.sort((left, right) => right - left);

  const position = newResults.indexOf(scores) + 1;
  const sumPlayers = newResults.length;
  const percent = Math.round(((sumPlayers - position) / sumPlayers) * 100);

  return winMessage(position, sumPlayers, percent);
};

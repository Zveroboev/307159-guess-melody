import declareNoun from '../declare-a-noun/index';

const winMessage = (position, sumPlayers, percent) => {
  const playerWord = declareNoun(sumPlayers, `игрока`, `игроков`, `игроков`);

  return `Вы заняли ${position} место из ${sumPlayers} ${playerWord}. Это лучше, чем у ${percent}% игроков`;
};

export const getPosition = (allResults, playerResult) => {
  return allResults.findIndex((result) => result.id === playerResult.id) + 1;
};

export const sortResults = (results) => {
  return results.sort((a, b) => {
    if (b.scores === a.scores) {
      return (b.lives === a.lives) ? a.time - b.time : b.lives - a.lives;
    }

    return b.scores - a.scores;
  });
};

export const countPercent = (sumPlayers, position) => Math.round(((sumPlayers - position) / sumPlayers) * 100);

export default (results, playerResult) => {
  const sortedResults = sortResults([...results]);
  const position = getPosition(sortedResults, playerResult);
  const sumPlayers = sortedResults.length;
  const percent = countPercent(sumPlayers, position);

  return winMessage(position, sumPlayers, percent);
};

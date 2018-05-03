const winMessage = (position, sumPlayers, percent) => {
  return `Вы заняли ${position} место из ${sumPlayers} игроков. Это лучше, чем у ${percent}% игроков`;
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
  const newResults = [...results];
  const sortedResults = sortResults(newResults);
  const position = getPosition(sortedResults, playerResult);
  const sumPlayers = sortedResults.length;
  const percent = countPercent(sumPlayers, position);

  return winMessage(position, sumPlayers, percent);
};

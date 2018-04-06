export default (results, playerResult) => {
  const newResults = [...results];
  const {scores, lives, time} = playerResult;

  newResults.push(scores);
  newResults.sort((left, right) => right - left);

  const position = newResults.indexOf(scores) + 1;
  // const sumPlayers = newResults.length;
  // const percent = Math.trunc((sumPlayers - position / sumPlayers - 1) * 100);

  return position;
};

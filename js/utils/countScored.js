const FAIL_SCORE = 2;

export default (prevState, isCorrect, isFast) => {
  let {lastQuestions, lives, scores, gameStatus} = prevState;

  lastQuestions--;

  if (isCorrect) {
    scores++;
    if (isFast) {
      scores++;
    }
  } else {
    scores -= FAIL_SCORE;
    lives--;
  }

  if (lives < 0) {
    gameStatus = `lose`;
  }

  if (lastQuestions === 0 && lives >= 0) {
    gameStatus = `win`;
  }

  return {lastQuestions, lives, scores, gameStatus};
};

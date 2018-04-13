import {FAIL_SCORE} from '../data/constants';

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

  if (lives < 1) {
    gameStatus = `lose`;
  }

  if (lastQuestions === 0 && lives >= 1) {
    gameStatus = `win`;
  }

  return {lastQuestions, lives, scores, gameStatus};
};

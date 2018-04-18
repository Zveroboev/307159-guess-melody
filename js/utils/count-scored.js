import {FAIL_SCORE} from '../data/constants';

export default (prevState, isCorrect, isFast) => {
  let {lastQuestions, lives, scores, gameStatus, level} = prevState;

  lastQuestions--;
  level++;

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
    level = 0;
  }

  if (lastQuestions === 0 && lives >= 1) {
    gameStatus = `win`;
    level = 0;
  }

  return {lastQuestions, lives, scores, gameStatus, level};
};

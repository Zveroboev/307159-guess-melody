import {FAIL_SCORE} from '../../data/constants';

export default (prevState, isCorrect, isFast) => {
  let {lastQuestions, lives, scores, gameStatus, level, fastAnswers} = prevState;

  lastQuestions--;
  level++;

  if (isCorrect) {
    scores++;
    if (isFast) {
      scores++;
      fastAnswers++;
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

  return {lastQuestions, lives, scores, gameStatus, level, fastAnswers};
};

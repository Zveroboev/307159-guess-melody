import {MAX_SUCCESS_TIME, SUCCESS_SCORE, COMMON_SCORE, FAIL_SCORE, MIN_CURRENT_ANSWERS} from '../constant';

export default (answers, lives) => {
  if (!Array.isArray(answers)) {
    throw new Error(`answers should be an array`);
  }

  if (typeof lives !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  const currentAnswers = answers.reduce((sum, answer) => answer.current ? ++sum : sum, 0);

  if (currentAnswers < MIN_CURRENT_ANSWERS) {
    return -1;
  }

  return answers.reduce((sumScored, answer) => {
    if (answer.current) {
      return answer.time < MAX_SUCCESS_TIME ? sumScored + SUCCESS_SCORE : sumScored + COMMON_SCORE;
    }

    return sumScored - FAIL_SCORE;
  }, 0);
};

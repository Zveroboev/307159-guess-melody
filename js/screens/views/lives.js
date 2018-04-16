import {MAX_LIVES} from '../../data/constants';

export default (state) => {
  const wrongAnswer = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

  return `
    <div class="main-mistakes">
      ${wrongAnswer.repeat(MAX_LIVES - state.lives)}
    </div>
  `;
};
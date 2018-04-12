import {MAX_LIVES} from '../data/constants';

const getLivesTemplate = (state) => {
  const wrongAnswer = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
  console.log('---', state);
  return `
    <div class="main-mistakes">
      ${new Array(MAX_LIVES - state.lives).fill(wrongAnswer)}
    </div>
`;
};

export default getLivesTemplate;

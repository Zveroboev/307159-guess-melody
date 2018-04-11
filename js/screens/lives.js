import {MAX_LIVES} from '../data/constants';

const getLivestemplate = (state) => `
<div class="main-mistakes">
  ${new Array(MAX_LIVES - state.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)}
</div>
`;

export default getLivestemplate;

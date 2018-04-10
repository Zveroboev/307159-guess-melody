import initialState from '../data/initialState';

const getTemplate = (state) => `
<div class="main-mistakes">
  <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
  <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
</div>
`;
const template = getTemplate(initialState);

export default template;

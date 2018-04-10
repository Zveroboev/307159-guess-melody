import initialState from '../data/initialState';
import {MS_PER_MINUTE} from '../data/constants';

export const getMinutes = (time) => {
  const minutes = Math.trunc(time / MS_PER_MINUTE).toString();

  return minutes.length > 1 ? minutes : `0${minutes}`;
};

export const getSeconds = (time) => {
  const minutes = Math.trunc(time / MS_PER_MINUTE);
  const seconds = (time / MS_PER_MINUTE - minutes).toFixed(2).split(`.`)[1];

  return seconds.length > 1 ? seconds : `0${seconds}`;
};

const getTemplate = (state) => `
<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
    <span class="timer-value-mins">${getMinutes(state.time)}</span><!--
    --><span class="timer-value-dots">:</span><!--
    --><span class="timer-value-secs">00</span>
</div>
`;
const template = getTemplate(initialState);

export default template;

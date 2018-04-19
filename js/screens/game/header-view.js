import AbstractView from '../abstract-view';
import {MAX_LIVES} from '../../data/constants';

const MS_PER_SECOND = 1000;
const SEC_PER_MINUTE = 60;

export const getMinutes = (time) => {
  const allSeconds = time / MS_PER_SECOND;
  const minutes = Math.trunc(allSeconds / SEC_PER_MINUTE).toString();

  return minutes.length > 1 ? minutes : `0${minutes}`;
};

export const getSeconds = (time) => {
  const allSeconds = time / MS_PER_SECOND;
  const minutes = Math.trunc(allSeconds / SEC_PER_MINUTE);
  const seconds = Math.trunc(allSeconds - minutes * SEC_PER_MINUTE).toString();

  return seconds.length > 1 ? seconds : `0${seconds}`;
};

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();

    this.state = state;
  }

  get time() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(..#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
        </circle>
      </svg>
      
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${getMinutes(this.state.time)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${getSeconds(this.state.time)}</span>
      </div>
    `;
  }

  get lives() {
    const wrongAnswer = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

    return `
      <div class="main-mistakes">
        ${wrongAnswer.repeat(MAX_LIVES - this.state.lives)}
      </div>
    `;
  }

  get template() {
    return `
      ${this.time}
      ${this.lives}
    `;
  }
}

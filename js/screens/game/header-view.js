import AbstractView from '../abstract-view';
import {MAX_LIVES} from '../../data/constants';

const SEC_PER_MINUTE = 60;

export const getMinutes = (time) => {
  const minutes = Math.trunc(time / SEC_PER_MINUTE).toString();

  return minutes.length > 1 ? minutes : `0${minutes}`;
};

export const getSeconds = (time) => {
  const minutes = Math.trunc(time / SEC_PER_MINUTE);
  const seconds = Math.trunc(time - minutes * SEC_PER_MINUTE).toString();

  return seconds.length > 1 ? seconds : `0${seconds}`;
};

export default class HeaderView extends AbstractView {
  constructor(time, lives) {
    super();

    this.time = time;
    this.lives = lives;
  }

  getTime() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(..#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
        </circle>
      </svg>
      
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${getMinutes(this.time)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${getSeconds(this.time)}</span>
      </div>
    `;
  }

  getLives() {
    const wrongAnswer = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

    return `
      <div class="main-mistakes">
        ${wrongAnswer.repeat(MAX_LIVES - this.lives)}
      </div>
    `;
  }

  get template() {
    return `
      <div>
        ${this.getTime()}
        ${this.getLives()}
      </div>
    `;
  }
}

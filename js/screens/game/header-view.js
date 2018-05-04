import AbstractView from '../abstract-view';

import {MAX_LIVES} from '../../data/constants';

const wrongAnswer = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

export default class HeaderView extends AbstractView {
  constructor(timer, lives) {
    super();

    this.timer = timer;
    this.lives = lives;
  }

  get template() {
    return `
      <div>
        ${this.getTimeTemplate()}
        ${this.getLivesTemplate()}
      </div>
    `;
  }

  getTimeTemplate() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
        </circle>
      </svg>
      
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${this.timer.minutes}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${this.timer.seconds}</span>
      </div>
    `;
  }

  getLivesTemplate() {
    return `
      <div class="main-mistakes">
        ${wrongAnswer.repeat(MAX_LIVES - this.lives)}
      </div>
    `;
  }

  updateLives(lives) {
    this.livesContainer.innerHTML = wrongAnswer.repeat(MAX_LIVES - lives);
  }


  updateTime(min, sec) {
    this.minContainer.textContent = min;
    this.secContainer.textContent = sec;
  }

  bind() {
    this.minContainer = this._elem.querySelector(`.timer-value-mins`);
    this.secContainer = this._elem.querySelector(`.timer-value-secs`);
    this.livesContainer = this._elem.querySelector(`.main-mistakes`);
  }
}

import AbstractView from './abstract-view';

export default class WelcomeView extends AbstractView {
  constructor(state) {
    super();

    this.state = state;
  }

  bind() {
    const replayBtn = this._elem.querySelector(`.main-replay`);

    replayBtn.addEventListener(`click`, this.onReplayClick);
  }
}

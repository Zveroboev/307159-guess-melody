import AbstractView from './abstract-view';

export default class ReplayView extends AbstractView {
  bind() {
    const replayBtn = this._elem.querySelector(`.main-replay`);

    replayBtn.addEventListener(`click`, this.onReplayClick);
  }
}

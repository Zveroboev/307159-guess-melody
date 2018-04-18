import renderScreen from '../../utils/render-screen';
import Application from '../../Application';
import LoseLivesView from './lose-lives-view';
import LoseTimeView from './lose-time-view';

const MIN_LIVES = 1;

export default class GameScreen {
  constructor(store) {
    this.store = store;

    this.loseLives = new LoseLivesView();
    this.loseTime = new LoseTimeView();

    this.onReplayClick = this.onReplayClick.bind(this);
  }

  get content() {
    return this.store.lives < MIN_LIVES ? this.loseLives : this.loseTime;
  }

  onReplayClick() {
    this.store.restart();
    Application.showWelcome();
  }

  init() {
    this.content.onReplayClick = this.onReplayClick;

    renderScreen(this.content.element);
  }
}

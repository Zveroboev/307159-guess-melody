import renderScreen from '../../utils/render-screen';
import WelcomeView from './welcome-view';

import {GameStatus} from '../../data/constants';

export default class GameScreen {
  constructor(store, levels, onStart) {
    this.store = store;
    this.view = new WelcomeView();
    this.levels = levels;
    this.onStart = onStart;

    this.onGameStart = this.onGameStart.bind(this);
  }

  onGameStart() {
    const gameStatus = GameStatus.PLAYING;
    const level = 1;
    const type = this.levels[0].type;

    this.store.setState({gameStatus, level, type});
    this.onStart(this.levels);
  }

  init() {
    this.view.onGameStart = this.onGameStart;

    renderScreen(this.view.element);
  }
}

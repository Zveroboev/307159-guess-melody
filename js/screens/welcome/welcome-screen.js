import renderScreen from '../../utils/render-screen';
import WelcomeView from './welcome-view';

import {GameStatus} from '../../data/constants';

export default class GameScreen {
  constructor(store, onStart) {
    this.store = store;
    this.view = new WelcomeView();
    this.onStart = onStart;

    this.onGameStart = this.onGameStart.bind(this);
  }

  onGameStart() {
    const gameStatus = GameStatus.PLAYING;
    const level = 1;
    const type = this.store.state.levels[0].type;

    this.store.setState({gameStatus, level, type});
    this.onStart();
  }

  init() {
    this.view.onGameStart = this.onGameStart;

    renderScreen(this.view.element);
  }
}

import renderScreen from '../../utils/render-screen';
import WelcomeView from './welcome-view';

export default class GameScreen {
  constructor(store, onStart) {
    this.store = store;
    this.view = new WelcomeView();
    this.onStart = onStart;

    this.onGameStart = this.onGameStart.bind(this);
  }

  onGameStart() {
    this.store.setState({gameStatus: `playing`, level: 1, type: `artist`});

    this.onStart();
  }

  init() {
    this.view.onGameStart = this.onGameStart;

    renderScreen(this.view.element);
  }
}

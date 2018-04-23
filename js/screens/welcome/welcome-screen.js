import renderScreen from '../../utils/render-screen';
import Application from '../../Application';
import WelcomeView from './welcome-view';

export default class GameScreen {
  constructor(store) {
    this.store = store;
    this.view = new WelcomeView();

    this.onGameStart = this.onGameStart.bind(this);
  }

  onGameStart() {
    this.store.setState({gameStatus: `playing`, level: 1, type: `artist`});

    Application.startGame();
  }

  init() {
    this.view.onGameStart = this.onGameStart;

    renderScreen(this.view.element);
  }
}

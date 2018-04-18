import renderScreen from '../../utils/render-screen';
import Application from '../../Application';
import WelcomeView from './welcome-view';

export default class GameScreen {
  constructor(store) {
    this.store = store;
    this.view = new WelcomeView();

    this.handleGameStart = this.handleGameStart.bind(this);
  }

  handleGameStart() {
    this.store.state = {gameStatus: `playing`, level: 1, type: `artist`};

    Application.startGame();
  }

  init() {
    this.view.onGameStart = this.handleGameStart;

    renderScreen(this.view.element);
  }
}

import renderScreen from '../../utils/render-screen';
import LoseLivesView from './lose-lives-view';
import Application from '../../Application';
import LoseTimeView from './lose-time-view';
import WinView from './win-view';

export default class GameScreen {
  constructor(store, allResults) {
    this.store = store;
    this.allResults = allResults;

    this.loseLivesResult = new LoseLivesView();
    this.loseTimeResult = new LoseTimeView();
    this.winResult = new WinView(this.store.state, this.allResults);

    this.onReplayClick = this.onReplayClick.bind(this);
  }

  get content() {
    const {state} = this.store;

    switch (state.gameStatus) {
      case `win`:
        return this.winResult;
      case `lose`:
        return state.lives > 0 ? this.loseTimeResult : this.loseLivesResult;
      default:
        throw new Error(`Unknown game status`);
    }
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

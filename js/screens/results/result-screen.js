import renderScreen from '../../utils/render-screen';
import LoseLivesView from './lose-lives-view';
import LoseTimeView from './lose-time-view';
import WinView from './win-view';

import initialState from '../../data/initial-state';
import {GameStatus} from '../../data/constants';

export default class ResultScreen {
  constructor(store, allResults, playerResults, onReplay) {
    this.store = store;
    this.allResults = allResults;
    this.playerResults = playerResults;
    this.onReplay = onReplay;

    this.loseLivesResult = new LoseLivesView();
    this.loseTimeResult = new LoseTimeView();
    this.winResult = new WinView(this.store.state, this.allResults, this.playerResults);

    this.onReplayClick = this.onReplayClick.bind(this);
  }

  get content() {
    const {state} = this.store;

    switch (state.gameStatus) {
      case GameStatus.WIN: {
        return this.winResult;
      }
      case GameStatus.LOSE: {
        return state.lives > 0 ? this.loseTimeResult : this.loseLivesResult;
      }
      default: {
        throw new Error(`Unknown game status`);
      }
    }
  }

  onReplayClick() {
    this.store.unsubscribeAll();
    this.store.setState(initialState);
    this.onReplay();
  }

  init() {
    this.content.onReplayClick = this.onReplayClick;

    renderScreen(this.content.element);
  }
}

import renderScreen from '../../utils/render-screen';
import countScored from '../../utils/count-scored';
import LevelArtistView from './level-artist-view';
import LevelGenreView from './level-genre-view';
import Application from '../../Application';
import HeaderView from './header-view';
import Timer from '../../utils/timer';

import {INITIAL_TIME} from '../../data/constants';

export default class GameScreen {
  constructor(store, levels) {
    this.store = store;
    this.levels = levels;

    const {state} = this.store;
    const onTimerEnd = () => this.store.setState({gameStatus: `lose`});

    this.artistLevel = new LevelArtistView(state, this.currentLevel);
    this.genreLevel = new LevelGenreView(state, this.currentLevel);
    this.timer = new Timer(INITIAL_TIME, onTimerEnd);
    this.header = new HeaderView(this.timer.getTime(), state.lives);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this.handleAnswer = this.handleAnswer.bind(this);
    this.updateLevel = this.updateLevel.bind(this);
    this.updateHeader = this.updateHeader.bind(this);

    this.store.subscribe(() => console.log(`---`, state));
    this.store.subscribe(this.updateLevel);
    this.store.subscribe(this.updateHeader);

    this.timer.subscribe(this.updateHeader);
  }

  get currentLevel() {
    return this.levels[this.store.state.level - 1];
  }

  get content() {
    return this.store.state.type === `artist` ? this.artistLevel : this.genreLevel;
  }

  updateLevel() {
    const {gameStatus, type} = this.store.state;

    switch (gameStatus) {
      case `playing`:
        let oldView = this.content;
        let newView;

        if (type === `artist`) {
          this.artistLevel = new LevelArtistView(this.store.state, this.currentLevel);
          newView = this.artistLevel;
        } else {
          this.genreLevel = new LevelGenreView(this.store.state, this.currentLevel);
          newView = this.genreLevel;
        }

        this.bindHandlers(newView);
        this.root.replaceChild(newView.element, oldView.element);
        newView = oldView = null;
        break;
      case `lose`:
        this.timer.stop();
        Application.showLose();
        break;
      case `win`:
        this.timer.stop();
        Application.showWin();
        break;
    }
  }

  updateHeader() {
    const header = new HeaderView(this.timer.getTime(), this.store.state.lives);

    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  handleAnswer(currentID, correctID) {
    const isCorrect = currentID === correctID;
    const isFast = false;

    this.store.setState(countScored(this.store.state, isCorrect, isFast));
  }

  bindHandlers(elem) {
    elem.handleAnswer = this.handleAnswer;
  }


  init() {
    this.bindHandlers(this.content);

    renderScreen(this.root);
    this.timer.start();
  }
}

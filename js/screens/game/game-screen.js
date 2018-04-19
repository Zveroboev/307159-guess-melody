import renderScreen from '../../utils/render-screen';
import countScored from '../../utils/count-scored';
import LevelArtistView from './level-artist-view';
import LevelGenreView from './level-genre-view';
import Application from '../../Application';
import HeaderView from './header-view';

export default class GameScreen {
  constructor(store, levels) {
    this.store = store;
    this.levels = levels;

    this.artistLevel = new LevelArtistView(this.store.state, this.currentLevel);
    this.genreLevel = new LevelGenreView(this.store.state, this.currentLevel);
    this.header = new HeaderView(this.store.state);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this.handleAnswer = this.handleAnswer.bind(this);
    this.updateLevel = this.updateLevel.bind(this);

    this.store.subscribe(() => console.log(`---`, this.store.state));
    this.store.subscribe(this.updateLevel);
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
        Application.showLose();
        break;
      case `win`:
        Application.showWin();
        break;
    }
  }

  handleAnswer(currentID, correctID) {
    const isCorrect = currentID === correctID;
    const isFast = false;

    this.store.state = countScored(this.store.state, isCorrect, isFast);
  }

  bindHandlers(elem) {
    elem.handleAnswer = this.handleAnswer;
  }

  init() {
    this.content.handleAnswer = this.handleAnswer;

    renderScreen(this.root);
  }
}

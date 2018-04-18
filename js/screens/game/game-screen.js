import renderScreen from '../../utils/render-screen';
import countScored from '../../utils/count-scored';
import LevelArtistView from './level-artist-view';
import LevelGenreView from './level-genre-view';
import Application from '../../Application';

export default class GameScreen {
  constructor(store, levels) {
    this.store = store;
    this.levels = levels;

    this.artistLevel = new LevelArtistView(this.store.state, this.currentLevel);
    this.genreLevel = new LevelGenreView(this.store.state, this.currentLevel);

    this.handleAnswer = this.handleAnswer.bind(this);
    this.updateScreen = this.updateScreen.bind(this);

    this.store.subscribe(() => console.log(`---`, this.store.state));
    this.store.subscribe(this.updateScreen);
  }

  get currentLevel() {
    return this.levels[this.store.state.level - 1];
  }

  get content() {
    return this.store.state.type === `artist` ? this.artistLevel : this.genreLevel;
  }

  updateScreen() {
    const {gameStatus, type} = this.store.state;

    switch (gameStatus) {
      case `playing`:
        if (type === `artist`) {
          this.artistLevel = new LevelArtistView(this.store.state, this.currentLevel);
        } else {
          this.genreLevel = new LevelGenreView(this.store.state, this.currentLevel);
        }

        this.init();
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

  init() {
    this.content.handleAnswer = this.handleAnswer;

    renderScreen(this.content.element);
  }
}

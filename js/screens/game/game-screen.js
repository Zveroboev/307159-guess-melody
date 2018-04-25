import renderScreen from '../../utils/render-screen';
import countScored from '../../utils/count-scored';
import LevelArtistView from './level-artist-view';
import LevelGenreView from './level-genre-view';
import Application from '../../Application';
import HeaderScreen from './header-screen';

export default class GameScreen {
  constructor(store, levels) {
    this.store = store;
    this.levels = levels;

    this.handleAnswer = this.handleAnswer.bind(this);
    this.updateLevel = this.updateLevel.bind(this);

    this.header = new HeaderScreen(store);
    this.content = this.getContent();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this.store.subscribe(this.updateLevel);
    this.header.startTimer();
  }

  getContent() {
    const {state} = this.store;
    const levelIndex = state.level - 1;

    const content = state.type === `artist`
      ? new LevelArtistView(state, this.levels[levelIndex])
      : new LevelGenreView(state, this.levels[levelIndex]);

    this.bindHandlers(content);

    return content;
  }

  updateLevel() {
    const {gameStatus} = this.store.state;

    switch (gameStatus) {
      case `playing`:
        const newContent = this.getContent();

        this.root.replaceChild(newContent.element, this.content.element);
        this.content = newContent;
        break;
      case `lose`:
        this.header.stopTimer();
        Application.showLose();
        break;
      case `win`:
        this.header.stopTimer();
        Application.showWin();
        break;
      default:
        this.header.stopTimer();
        throw new Error(`Unknown game status`);
    }
  }

  handleAnswer(currentID, correctID) {
    let isCorrect;

    if (Array.isArray(currentID) && Array.isArray(correctID)) {
      isCorrect = currentID.toString() === correctID.toString();
    } else {
      isCorrect = currentID === correctID;
    }

    const isFast = false;
    const newState = countScored(this.store.state, isCorrect, isFast);

    if (newState.gameStatus === `playing`) {
      newState.type = this.levels[this.store.state.level].type;
    }

    this.store.setState(newState);

    if (!isCorrect) {
      this.header.updateLives();
    }
  }

  bindHandlers(elem) {
    elem.handleAnswer = this.handleAnswer;
  }

  init() {
    renderScreen(this.root);
  }
}

import renderScreen from '../../utils/render-screen';
import countScored from '../../utils/count-scored';
import LevelArtistView from './level-artist-view';
import LevelGenreView from './level-genre-view';
import HeaderScreen from './header-screen';

import {FAST_ANSWER_TIME, QuestionType, GameStatus} from '../../data/constants';

export default class GameScreen {
  constructor(store, onEnd) {
    this.store = store;
    this.onEnd = onEnd;

    this.handleAnswer = this.handleAnswer.bind(this);
    this.updateLevel = this.updateLevel.bind(this);
    this.setInitialState();

    this.header = new HeaderScreen(store);
    this.content = this.getContent();
    this.time = this.header.time;

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this.store.subscribe(this.updateLevel);
    this.header.startTimer();
  }

  setInitialState() {
    const lastQuestions = this.store.state.levels.length;
    const type = this.store.state.levels[0].type;
    const gameStatus = GameStatus.PLAYING;
    const level = 1;

    this.store.setState({gameStatus, level, type, lastQuestions});
  }

  getContent() {
    const {state} = this.store;
    const levelIndex = state.level - 1;

    const content = state.type === QuestionType.ARTIST
      ? new LevelArtistView(state, state.levels[levelIndex])
      : new LevelGenreView(state, state.levels[levelIndex]);

    this.bindHandlers(content);

    return content;
  }

  updateLevel() {
    const {gameStatus} = this.store.state;

    switch (gameStatus) {
      case GameStatus.PLAYING:
        const newContent = this.getContent();

        this.root.replaceChild(newContent.element, this.content.element);
        this.time = this.header.time;
        this.content = newContent;
        break;
      case GameStatus.LOSE:
      case GameStatus.WIN:
        this.header.stopTimer();
        this.store.unsubscribe(this.updateLevel);
        this.store.setState({time: this.header.time});
        this.onEnd();
        break;
      default:
        this.header.stopTimer();
        throw new Error(`Unknown game status`);
    }
  }

  handleAnswer(isCorrect) {
    const {state} = this.store;
    const isFast = this.time - this.header.time < FAST_ANSWER_TIME;
    const newState = countScored(this.store.state, isCorrect, isFast);

    if (newState.gameStatus === GameStatus.PLAYING) {
      newState.type = state.levels[state.level].type;
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

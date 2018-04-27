import renderScreen from '../../utils/render-screen';
import countScored from '../../utils/count-scored';
import LevelArtistView from './level-artist-view';
import LevelGenreView from './level-genre-view';
import HeaderScreen from './header-screen';
import Timer from '../../utils/timer';

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
    this.timer = new Timer(FAST_ANSWER_TIME);

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this.store.subscribe(this.updateLevel);
    this.header.startTimer();
  }

  setInitialState() {
    const gameStatus = GameStatus.PLAYING;
    const level = 1;
    const type = this.store.state.levels[0].type;

    this.store.setState({gameStatus, level, type});
  }

  getContent() {
    const {state} = this.store;
    const levelIndex = state.level - 1;
    debugger;

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
        this.timer = new Timer(FAST_ANSWER_TIME);
        this.timer.start();
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
    const isFast = this.timer.getTime() > 0;
    const newState = countScored(this.store.state, isCorrect, isFast);

    if (newState.gameStatus === GameStatus.PLAYING) {
      newState.type = state.levels[state.level].type;
    }

    this.timer.stop();
    this.store.setState(newState);

    if (!isCorrect) {
      this.header.updateLives();
    }
  }

  bindHandlers(elem) {
    elem.handleAnswer = this.handleAnswer;
  }

  init() {
    this.timer.start();
    renderScreen(this.root);
  }
}

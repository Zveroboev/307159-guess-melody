import {MAX_LIVES, MAX_TIME, ALL_LEVELS} from '../data/constants';
import Store from '../utils/create-store';

const initialState = {
  lastQuestions: ALL_LEVELS,
  lives: MAX_LIVES,
  time: MAX_TIME,
  scores: 0,
  currentLevel: `level-0`,
  gameStatus: `playing`,
};

const store = new Store(initialState);

export default store;

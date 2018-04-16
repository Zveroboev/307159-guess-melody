import LoseLevelView from './views/lose-lives-view';
import store from '../data/store';
import initialState from '../data/initial-state';

export default () => {
  const screen = new LoseLevelView();

  screen.onReplayClick = () => store.setState(initialState);
  return screen.element;
};

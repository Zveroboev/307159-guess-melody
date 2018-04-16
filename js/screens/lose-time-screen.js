import LoseTimeView from './views/lose-time-view';
import store from '../data/store';
import initialState from '../data/initial-state';

export default () => {
  const screen = new LoseTimeView();

  screen.onReplayClick = () => store.setState(initialState);
  return screen.element;
};

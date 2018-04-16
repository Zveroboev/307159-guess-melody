import WinView from './views/win-view';
import store from '../data/store';
import initialState from '../data/initial-state';

export default (state, allResults) => {
  const screen = new WinView(state, allResults);

  screen.onReplayClick = () => store.setState(initialState);
  return screen.element;
};

import store from '../data/store';
import WelcomeView from './views/welcome-view';

export default () => {
  const screen = new WelcomeView();

  screen.onPlayClick = () => {
    store.setState({level: `level-1`, type: `artist`, gameStatus: `playing`});
  };

  return screen.element;
};

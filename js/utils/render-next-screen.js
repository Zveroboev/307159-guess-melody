import getArtistLevelScreen from '../screens/level-artist';
import getGenreLevelScreen from '../screens/level-genre';
import getLoseLivesScreen from '../screens/lose-lives';
import getWelcomeScreen from '../screens/welcome';
import getWinScreen from '../screens/win';
import renderScreen from './render-screen';
import levels from '../data/levels';
import store from '../data/store';

const renderNextScreen = () => {
  const state = store.getState();
  const level = levels[state.level];
  let screen;

  switch (state.gameStatus) {
    case `playing`:
      screen = state.type === `artist` ? getArtistLevelScreen(state, level) : getGenreLevelScreen(state, level);
      break;
    case `lose`:
      screen = getLoseLivesScreen(state);
      break;
    case `win`:
      screen = getWinScreen(state);
      break;
    default:
      screen = getWelcomeScreen();
  }

  renderScreen(screen);
};

export default renderNextScreen;

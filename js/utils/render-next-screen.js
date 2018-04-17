import getArtistLevelScreen from '../screens/level-artist-screen';
import getGenreLevelScreen from '../screens/level-genre-screen';
import getLoseLivesScreen from '../screens/lose-lives-screen';
import getWelcomeScreen from '../screens/welcome-screen';
import getWinScreen from '../screens/win-screen';
import renderScreen from './render-screen';
import levels from '../data/levels';
import store from '../data/store';

const ALL_RESULTS = [];

export default () => {
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
      screen = getWinScreen(state, ALL_RESULTS);
      break;
    case `welcome`:
      screen = getWelcomeScreen();
      break;
    default:
      screen = getWelcomeScreen();
      break;
  }

  renderScreen(screen);
};

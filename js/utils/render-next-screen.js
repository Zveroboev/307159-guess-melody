import getArtistLevelScreen from '../screens/game/level-artist-screen';
import getGenreLevelScreen from '../screens/game/level-genre-screen';
import getLoseLivesScreen from '../screens/lose/lose-lives-screen';
import getWelcomeScreen from '../screens/welcome/welcome-screen';
import getWinScreen from '../screens/results/win-screen';
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
      screen = level.type === `artist` ? getArtistLevelScreen(state, level) : getGenreLevelScreen(state, level);
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

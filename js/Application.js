import WelcomeScreen from './screens/welcome/welcome-screen';
import ResultScreen from './screens/results/result-screen';
import GameScreen from './screens/game/game-screen';
import levels from './data/levels';
import store from './data/store';

// store.subscribe(() => console.log('---new State', store.state));

export default class Application {
  static showWelcome() {
    const welcomeScreen = new WelcomeScreen(store);

    welcomeScreen.init();
  }

  static startGame() {
    const gameScreen = new GameScreen(store, levels);

    gameScreen.init();
  }

  static showLose() {
    const resultScreen = new ResultScreen(store);

    resultScreen.init();
  }

  static showWin() {
    const allResults = [];
    const resultScreen = new ResultScreen(store, allResults);

    resultScreen.init();

  }
}

import WelcomeScreen from './screens/welcome/welcome-screen';
import ResultScreen from './screens/results/result-screen';
import GameScreen from './screens/game/game-screen';
import levels from './data/levels';
import store from './data/store';

// store.subscribe(() => console.log('---new State', store.state));

export default class Application {
  static showWelcome() {
    const onGameStart = Application.startGame;
    const welcomeScreen = new WelcomeScreen(store, onGameStart);

    welcomeScreen.init();
  }

  static startGame() {
    const onWin = Application.showWin;
    const onLose = Application.showLose;
    const gameScreen = new GameScreen(store, levels, onWin, onLose);

    gameScreen.init();
  }

  static showLose() {
    const onReplay = Application.showWelcome;
    const resultScreen = new ResultScreen(store, null, onReplay);

    resultScreen.init();
  }

  static showWin() {
    const onReplay = Application.showWelcome;
    const allResults = [];
    const resultScreen = new ResultScreen(store, allResults, onReplay);

    resultScreen.init();

  }
}

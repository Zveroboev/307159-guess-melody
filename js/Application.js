import WelcomeScreen from './screens/welcome/welcome-screen';
import LoseScreen from './screens/results/lose-screen';
import GameScreen from './screens/game/game-screen';
import levels from './data/levels';
import store from './data/store';

store.subscribe(() => console.log(`---`, store.state));

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
    const loseScreen = new LoseScreen(store);

    loseScreen.init();
  }

  static showWin() {

  }
}

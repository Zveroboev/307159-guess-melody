import renderScreen from '../../utils/render-screen';
import WelcomeView from './welcome-view';

export default class WelcomeScreen {
  constructor(store, onStart) {
    this.store = store;
    this.view = new WelcomeView();
    this.onStart = onStart;
  }

  init() {
    this.view.onGameStart = this.onStart;

    renderScreen(this.view.element);
  }
}

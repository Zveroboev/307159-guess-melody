import HeaderView from './header-view';
import Timer from '../../utils/timer';

import {INITIAL_TIME} from '../../data/constants';

export default class HeaderScreen {
  constructor(store) {
    this.store = store;

    const onTimerEnd = () => this.store.setState({gameStatus: `lose`});

    this.timer = new Timer(INITIAL_TIME, onTimerEnd);
    this.view = new HeaderView(this.timer, this.store.state.lives);

    this.onTick = this.onTick.bind(this);

    this.timer.subscribe(this.onTick);
  }

  get element() {
    return this.view.element;
  }

  get time() {
    return this.timer.getTime();
  }

  onTick() {
    const min = this.timer.minutes;
    const sec = this.timer.seconds;

    this.view.updateTime(min, sec);
  }

  startTimer() {
    this.timer.start();
  }

  stopTimer() {
    this.timer.stop();
  }

  updateLives() {
    this.view.updateLives(this.store.state.lives);
  }

}

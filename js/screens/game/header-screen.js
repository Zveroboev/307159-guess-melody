import HeaderView from './header-view';
import Timer from '../../utils/timer';

import {INITIAL_TIME} from '../../data/constants';

export default class HeaderScreen {
  constructor(store) {
    this.store = store;

    const onTimerEnd = () => this.store.setState({gameStatus: `lose`});

    this.timer = this.timer = new Timer(INITIAL_TIME, onTimerEnd);
    this.view = new HeaderView(this.timer.getTime(), this.store.state.lives);

    this.onTick = this.onTick.bind(this);

    this.timer.subscribe(this.onTick);
  }

  onTick() {
    const time = this.timer.getTime();

    this.view.updateTime(time);
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

  get time() {
    return this.timer.getTime();
  }

  get element() {
    return this.view.element;
  }

}

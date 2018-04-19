export default class Timer {
  constructor(initialTime = 0) {
    this.time = initialTime;
    this._interval = null;

    this.tick = this.tick.bind(this);
  }

  tick() {
    this.time--;

    if (this.time <= 0) {
      this.stop();
    }
  }

  start() {
    this._interval = setInterval(this.tick, 1000);
  }

  stop() {
    clearInterval(this._interval);
  }

  getTime() {
    return this.time < 0 ? null : this.time;
  }

}

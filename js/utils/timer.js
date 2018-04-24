export default class Timer {
  constructor(initialTime = 0, afterEnd = () => {}) {
    this.time = initialTime;
    this.afterEnd = afterEnd;
    this._interval = null;
    this._callbacks = new Set();

    this.tick = this.tick.bind(this);
  }

  tick() {
    this.time--;
    this._callbacks.forEach((cb) => cb());

    if (this.time <= 0) {
      this.stop();
      this.afterEnd();
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

  subscribe(cb) {
    this._callbacks.add(cb);
  }

}

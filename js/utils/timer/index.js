const SEC_PER_MINUTE = 60;

export default class Timer {
  constructor(initialTime = 0, afterEnd = () => {}) {
    this.time = initialTime;
    this.afterEnd = afterEnd;
    this.interval = null;
    this.callbacks = new Set();

    this.tick = this.tick.bind(this);
  }

  get minutes() {
    return Timer.getCorrectRow(this.countMinutes());
  }

  get seconds() {
    return Timer.getCorrectRow(this.countSeconds());
  }

  getTime() {
    return this.time < 0 ? null : this.time;
  }

  countMinutes() {
    return Math.trunc(this.time / SEC_PER_MINUTE);
  }

  countSeconds() {
    return Math.trunc(this.time - this.countMinutes() * SEC_PER_MINUTE);
  }

  tick() {
    this.time--;
    this.callbacks.forEach((cb) => cb());

    if (this.time <= 0) {
      this.stop();
      this.afterEnd();
    }
  }

  start() {
    this.interval = setInterval(this.tick, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  subscribe(cb) {
    this.callbacks.add(cb);
  }

  static getCorrectRow(value) {
    const row = value.toString();

    return row.length > 1 ? row : `0${row}`;
  }
}

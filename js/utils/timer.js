export default class Timer {
  constructor(initialTime = 0) {
    this.time = initialTime;
  }

  tick() {
    this.time--;
    if (this.time <= 0) {
      return null;
    }

    return this.time;
  }
}

export default class CreateStore {
  constructor(state = {}) {
    this.state = state;
    this.callbacks = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState);
    this.callbacks.forEach((cb) => cb());
  }

  subscribe(callback) {
    this.callbacks.push(callback);
  }
}

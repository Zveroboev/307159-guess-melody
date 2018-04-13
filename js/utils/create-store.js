export default class Store {
  constructor(state = {}) {
    this.state = state;
    this._callbacks = new Set();
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState);
    this._callbacks.forEach((cb) => cb());
  }

  subscribe(callback) {
    this._callbacks.add(callback);
  }
}

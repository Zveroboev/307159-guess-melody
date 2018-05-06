export default class Store {
  constructor(state = {}) {
    this._state = state;
    this.callbacks = new Set();
  }

  get state() {
    return this._state;
  }

  setState(newState) {
    this._state = Object.assign({}, this._state, newState);
    this.callbacks.forEach((cb) => cb());
  }

  subscribe(callback) {
    this.callbacks.add(callback);
  }

  unsubscribe(callback) {
    this.callbacks.delete(callback);
  }

  unsubscribeAll() {
    this.callbacks.clear();
  }
}

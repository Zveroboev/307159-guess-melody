export default class Store {
  constructor(state = {}) {
    this._state = state;
    this._callbacks = new Set();
  }

  get state() {
    return this._state;
  }

  setState(newState) {
    this._state = Object.assign({}, this._state, newState);
    this._callbacks.forEach((cb) => cb());
  }

  subscribe(callback) {
    this._callbacks.add(callback);
  }

  unsubscribe(callback) {
    this._callbacks.delete(callback);
  }

  unsubscribeAll() {
    this._callbacks.clear();
  }
}

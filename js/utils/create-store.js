export default class Store {
  constructor(state = {}) {
    this._state = state;
    this._initialState = state;
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

  restart() {
    this._state = this._initialState;
    this._callbacks.clear();
  }
}

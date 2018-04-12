export default class CreateStore {
  constructor(state = {}) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = Object.assign({}, this.state, newState);
  }
}

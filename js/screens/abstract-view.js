import getElementFromTemplate from '../utils/get-element-from-template';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  get element() {
    if (this._elem) {
      return this._elem;
    }

    this._elem = this.render();
    this.bind();
    return this._elem;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {
    // bind handlers
  }
}

import {URL} from './data/constants';

const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Loader {
  static loadData() {
    return window.fetch(URL).then(checkStatus);
  }
}

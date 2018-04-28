import {URL} from './data/constants';

const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const findElem = (nestedObject, correctKey, results) => {
  for (let key in nestedObject) {
    if (nestedObject.hasOwnProperty(key)) {
      if (key === correctKey) {
        results.push(nestedObject[key]);
      } else if (typeof nestedObject[key] === `object` && nestedObject[key] !== null) {
        findElem(nestedObject[key], correctKey, results);
      }
    }
  }

  return results;
};

export const deepFilter = (object, key) => {
  const result = [];

  return findElem(object, key, result);
};

const getAudio = (src) => new Promise((resolve, reject) => {
  const audio = new Audio();

  audio.src = src;
  audio.oncanplaythrough = (evt) => resolve(evt.path[0]);
  audio.onerror = () => reject();
});

export default class Loader {
  static loadData() {
    return window.fetch(URL).then(checkStatus);
  }

  static loadAudios(gameData) {
    const sources = deepFilter(gameData, `src`);
    const audios = sources.map((source) => getAudio(source));
    console.log(`---`, sources);

    return Promise.all(audios);
  }
}

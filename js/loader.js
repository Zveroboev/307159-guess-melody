import {URL} from './data/constants';

const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const deepSearch = (object, key) => {
  let result = [];

  Object.keys(object).forEach((objectKey) => {
    if (objectKey === key) {
      result.push(object[objectKey]);
    } else if (typeof object[objectKey] === `object` && object[objectKey] !== null) {
      result.push(...deepSearch(object[objectKey], key));
    }
  });

  return result;
};

const getAudio = (src) => new Promise((resolve, reject) => {
  const audio = new Audio();

  audio.src = src;
  audio.oncanplaythrough = (evt) => resolve(evt.path[0]);
  audio.onerror = () => reject();

  return audio;
});

export default class Loader {
  static loadData() {
    return window.fetch(URL).then(checkStatus);
  }

  static loadAudios(gameData) {
    const sources = deepSearch(gameData, `src`);
    const audios = sources.map((source) => getAudio(source));
    console.log('---', audios);

    return Promise.all(audios);
  }
}

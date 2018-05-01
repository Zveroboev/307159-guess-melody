import {URL, USER_ID} from './data/constants';
import getValuesByKey from './utils/get-values-by-key';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

const getAudio = (src) => new Promise((resolve, reject) => {
  const audio = new Audio();

  audio.src = src;
  audio.oncanplaythrough = (evt) => resolve(evt.path[0]);
  audio.onerror = () => reject();
});

export default class Loader {
  static loadData() {
    return window.fetch(`${URL}/questions`).then(checkStatus).then(toJSON);
  }

  static loadAudios(gameData) {
    const sources = getValuesByKey(gameData, `src`);
    const audios = sources.map((source) => getAudio(source));

    return Promise.all(audios);
  }

  static loadResults() {
    return window.fetch(`${URL}/stats/${USER_ID}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(`${URL}/stats/${USER_ID}`, requestSettings).then(checkStatus);
  }
}

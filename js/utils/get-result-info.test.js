// Из-за вложенности describe-describe-it, ESLint ругается на один вложенный коллбек, думая, что он 4 по вложенности
/* eslint-disable max-nested-callbacks */
import {assert} from 'chai';
import getResultInfo from './get-result-info';

describe(`Вывод информации о результате игры`, () => {
  describe(`Определяем место среди всех игроков`, () => {
    it(`должен подсчитать результат среди всех игроков`, () => {
      const results = [4, 5, 8, 10, 12];
      const playerResults = {scores: 6, lives: 3, time: 30000};
      const expectedPlace = 4;
      // Разбивая строку на массив и формирую из него новый массив с элементами,
      // которые можно преобразовать в число. В данном случае беру первый элемент массива.
      const place = getResultInfo(results, playerResults).split(` `).filter((el) => !isNaN(parseInt(el, 10)))[0];

      assert.equal(parseInt(place, 10), expectedPlace);
    });

    it(`должен подсчитать результат среди всех игроков (другие входные параметры)`, () => {
      const results = [3, 5, 8, 15, 14];
      const playerResults = {scores: 20, lives: 3, time: 30000};
      const expectedPlace = 1;
      const place = getResultInfo(results, playerResults).split(` `).filter((el) => !isNaN(parseInt(el, 10)))[0];

      assert.equal(parseInt(place, 10), expectedPlace);
    });
  });

  describe(`Определяем % среди всех игроков`, () => {
    it(`должен подсчитать % среди всех игроков (первое место)`, () => {
      const results = [4, 5, 8, 12];
      const playerResults = {scores: 14, lives: 3, time: 30000};
      const expectedPercent = 80;
      // Разбивая строку на массив и формирую из него новый массив с элементами,
      // которые можно преобразовать в число. В данном случае беру последний элемент массива.
      const place = getResultInfo(results, playerResults).split(` `).filter((el) => !isNaN(parseInt(el, 10)))[2];

      assert.equal(parseInt(place, 10), expectedPercent);
    });

    it(`должен подсчитать % среди всех игроков (любое место в середине)`, () => {
      const results = [3, 5, 8, 15, 16, 17, 18, 19, 20, 21];
      const playerResults = {scores: 9, lives: 3, time: 30000};
      const expectedPercent = 27;
      const place = getResultInfo(results, playerResults).split(` `).filter((el) => !isNaN(parseInt(el, 10)))[2];

      assert.equal(parseInt(place, 10), expectedPercent);
    });

    it(`должен подсчитать % среди всех игроков (последнее место)`, () => {
      const results = [3, 5, 8, 15, 16, 17, 18, 19, 20, 21];
      const playerResults = {scores: 1, lives: 3, time: 30000};
      const expectedPercent = 0;
      const place = getResultInfo(results, playerResults).split(` `).filter((el) => !isNaN(parseInt(el, 10)))[2];

      assert.equal(parseInt(place, 10), expectedPercent);
    });
  });
});

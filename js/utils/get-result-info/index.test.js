// Из-за вложенности describe-describe-it, ESLint ругается на один вложенный коллбек, думая, что он 4 по вложенности
/* eslint-disable max-nested-callbacks */
import {assert} from 'chai';
import {getPosition, sortResults, countPercent} from './index';

const results = [
  {"time": 289, "scores": 8, "lives": 1, "id": 1},
  {"time": 213, "scores": 5, "lives": 1, "id": 2},
  {"time": 123, "scores": 4, "lives": 3, "id": 3},
  {"time": 165, "scores": 10, "lives": 2, "id": 4},
];

describe(`Вывод информации о результате игры`, () => {
  describe(`Сортируем массив результатов и получаем место`, () => {
    it(`должен отсортировать массив с резльтатами игроков`, () => {
      const playerResults = {scores: 6, lives: 3, time: 123, id: 5};
      const allResults = [...results];

      allResults.push(Object.assign({}, playerResults));

      const sortedResults = sortResults(allResults);
      const position = getPosition(sortedResults, playerResults);

      assert.equal(position, 3);
    });

    it(`должен отсортировать массив с резльтатами игроков (другие входные данные)`, () => {
      const playerResults = {scores: 12, lives: 2, time: 123, id: 5};
      const allResults = [...results];

      allResults.push(Object.assign({}, playerResults));

      const sortedResults = sortResults(allResults);
      const position = getPosition(sortedResults, playerResults);

      assert.equal(position, 1);
    });

    it(`должен отсортировать массив с резльтатами игроков при одинаковом кол-ве очков, но разном кол-ве жизней`, () => {
      const playerResults = {scores: 10, lives: 3, time: 123, id: 5};
      const allResults = [...results];

      allResults.push(Object.assign({}, playerResults));

      const sortedResults = sortResults(allResults);
      const position = getPosition(sortedResults, playerResults);

      assert.equal(position, 1);
    });

    it(`должен отсортировать массив с резльтатами игроков при одинаковом кол-ве очков и жизней, но разном кол-ве времени`, () => {
      const playerResults = {scores: 10, lives: 2, time: 100, id: 5};
      const allResults = [...results];

      allResults.push(Object.assign({}, playerResults));

      const sortedResults = sortResults(allResults);
      const position = getPosition(sortedResults, playerResults);

      assert.equal(position, 1);
    });

    it(`должен занять первое место если это единственный результат`, () => {
      const playerResults = {scores: 6, lives: 3, time: 123, id: 1};
      const allResults = [{scores: 6, lives: 3, time: 123, id: 1}];

      const sortedResults = sortResults(allResults);
      const position = getPosition(sortedResults, playerResults);

      assert.equal(position, 1);
    });
  });

  describe(`Определяем % среди всех игроков`, () => {
    it(`должен подсчитать % среди всех игроков (первое место)`, () => {
      const playerResults = {scores: 10, lives: 2, time: 100, id: 5};
      const allResults = [...results];

      allResults.push(Object.assign({}, playerResults));

      const sortedResults = sortResults(allResults);
      const sumPlayers = sortedResults.length;
      const position = getPosition(sortedResults, playerResults);
      const percent = countPercent(sumPlayers, position);

      assert.equal(percent, 80);
    });

    it(`должен подсчитать % среди всех игроков (любое место в середине)`, () => {
      const playerResults = {scores: 6, lives: 3, time: 321, id: 5};
      const allResults = [...results];

      allResults.push(Object.assign({}, playerResults));

      const sortedResults = sortResults(allResults);
      const sumPlayers = sortedResults.length;
      const position = getPosition(sortedResults, playerResults);
      const percent = countPercent(sumPlayers, position);

      assert.equal(percent, 40);
    });

    it(`должен подсчитать % среди всех игроков (последнее место)`, () => {
      const playerResults = {scores: 1, lives: 1, time: 213, id: 5};
      const allResults = [...results];

      allResults.push(Object.assign({}, playerResults));

      const sortedResults = sortResults(allResults);
      const sumPlayers = sortedResults.length;
      const position = getPosition(sortedResults, playerResults);
      const percent = countPercent(sumPlayers, position);

      assert.equal(percent, 0);
    });
  });
});

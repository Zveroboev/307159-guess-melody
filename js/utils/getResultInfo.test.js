import {assert} from 'chai';
import getResultInfo from './getResultInfo';

describe(`Вывод информации о результате игры`, () => {
  describe(`Определяем место среди всех игроков`, () => {
    it(`должен подсчитать результат среди всех игроков`, () => {
      const results = [4, 5, 8, 10, 12];
      const playerResults = {
        scores: 6,
        lives: 3,
        time: 30000,
      };
      const expectedPlace = 4;

      assert.equal(getResultInfo(results, playerResults), expectedPlace);
    });

    it(`должен подсчитать результат среди всех игроков (другие входные параметры)`, () => {
      const results = [3, 5, 8, 15, 14];
      const playerResults = {
        scores: 20,
        lives: 3,
        time: 30000,
      };
      const expectedPlace = 1;

      assert.equal(getResultInfo(results, playerResults), expectedPlace);
    });
  });

  describe(`Определяем % среди всех игроков`, () => {
    // it(`должен подсчитать % среди всех игроков`, () => {
    //   const results = [4, 5, 8, 10, 12];
    //   const playerResults = {
    //     scores: 14,
    //     lives: 3,
    //     time: 30000,
    //   };
    //   const expectedPlace = 100;
    //
    //   assert.equal(getResultInfo(results, playerResults), expectedPlace);
    // });

    // it(`должен подсчитать % среди всех игроков (другие входные параметры)`, () => {
    //   const results = [3, 5, 8, 15, 14];
    //   const playerResults = {
    //     scores: 20,
    //     lives: 3,
    //     time: 30000,
    //   };
    //   const expectedPlace = 1;
    //
    //   assert.equal(getResultInfo(results, playerResults), expectedPlace);
    // });
  });
});

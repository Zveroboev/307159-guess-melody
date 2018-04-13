import {assert} from 'chai';
import countScored from './count-scored';

describe(`Подсчет очков`, () => {
  describe(`Верные ответы`, () => {
    it(`должен подсчитать правильное колличество очков если игрок ответил правильно и медленно`, () => {
      const prevState = {
        lastQuestions: 10,
        lives: 3,
        scores: 0,
        gameStatus: `playing`,
      };
      const expectedState = {
        lastQuestions: 9,
        lives: 3,
        scores: 1,
        gameStatus: `playing`,
      };

      assert.deepEqual(countScored(prevState, true, false), expectedState);
    });

    it(`должен подсчитать правильное колличество очков если игрок ответил правильно и медленно (другие входные данные)`, () => {
      const prevState = {
        lastQuestions: 8,
        lives: 3,
        scores: 2,
        gameStatus: `playing`,
      };
      const expectedState = {
        lastQuestions: 7,
        lives: 3,
        scores: 3,
        gameStatus: `playing`,
      };

      assert.deepEqual(countScored(prevState, true, false), expectedState);
    });

    it(`должен подсчитать правильное колличество очков если игрок ответил правильно и быстро`, () => {
      const prevState = {
        lastQuestions: 10,
        lives: 3,
        scores: 0,
        gameStatus: `playing`,
      };
      const expectedState = {
        lastQuestions: 9,
        lives: 3,
        scores: 2,
        gameStatus: `playing`,
      };

      assert.deepEqual(countScored(prevState, true, true), expectedState);
    });
  });

  describe(`Неверные ответы`, () => {
    it(`должен подсчитать правильное колличество очков и жизней если игрок ответил не правильно`, () => {
      const prevState = {
        lastQuestions: 8,
        lives: 3,
        scores: 2,
        gameStatus: `playing`,
      };
      const expectedState = {
        lastQuestions: 7,
        lives: 2,
        scores: 0,
        gameStatus: `playing`,
      };

      assert.deepEqual(countScored(prevState, false, false), expectedState);
    });

    it(`должен подсчитать правильное колличество очков и жизней если игрок ответил не правильно (другие входные данные)`, () => {
      const prevState = {
        lastQuestions: 5,
        lives: 2,
        scores: 5,
        gameStatus: `playing`,
      };
      const expectedState = {
        lastQuestions: 4,
        lives: 1,
        scores: 3,
        gameStatus: `playing`,
      };

      assert.deepEqual(countScored(prevState, false, true), expectedState);
    });
  });

  describe(`Смена статуса игры`, () => {
    it(`должен сменить статус игры на "win", если кончились вопросы и последний ответ был правильный`, () => {
      const prevState = {
        lastQuestions: 1,
        lives: 3,
        scores: 12,
        gameStatus: `playing`,
      };
      const expectedState = {
        lastQuestions: 0,
        lives: 3,
        scores: 14,
        gameStatus: `win`,
      };

      assert.deepEqual(countScored(prevState, true, true), expectedState);
    });

    it(`должен сменить статус игры на "win", если кончились вопросы, остались жизни и последний ответ был не правильный`, () => {
      const prevState = {
        lastQuestions: 1,
        lives: 2,
        scores: 12,
        gameStatus: `playing`,
      };
      const expectedState = {
        lastQuestions: 0,
        lives: 1,
        scores: 10,
        gameStatus: `win`,
      };

      assert.deepEqual(countScored(prevState, false, true), expectedState);
    });

    it(`должен сменить статус игры на "lose", если кончились жизни и остались вопросы`, () => {
      const prevState = {
        lastQuestions: 4,
        lives: 1,
        scores: 5,
        gameStatus: `playing`,
      };
      const expectedState = {
        lastQuestions: 3,
        lives: 0,
        scores: 3,
        gameStatus: `lose`,
      };

      assert.deepEqual(countScored(prevState, false, true), expectedState);
    });

    it(`должен сменить статус игры на "lose", если кончились жизни, и вопросы`, () => {
      const prevState = {
        lastQuestions: 1,
        lives: 1,
        scores: 5,
        gameStatus: `playing`,
      };
      const expectedState = {
        lastQuestions: 0,
        lives: 0,
        scores: 3,
        gameStatus: `lose`,
      };

      assert.deepEqual(countScored(prevState, false, true), expectedState);
    });
  });
});

import {assert} from 'chai';
import Store from './create-store';

describe(`Класс хранилища состояния приложения`, () => {
  describe(`Изменение состояния`, () => {
    it(`должен вернуть пустой объект состояния, если ничего не передали`, () => {
      const store = new Store();
      const expected = {};

      assert.deepEqual(store.state, expected);
    });

    it(`должен установить в изначальное состояние переданный объект`, () => {
      const state = {lives: 3, scores: 0};
      const store = new Store(state);

      assert.deepEqual(store.state, state);
    });

    it(`должен обновить состояние на переданный объект`, () => {
      const state = {lives: 3, scores: 0};
      const store = new Store(state);
      const expected = {lives: 3, scores: 0, gameStatus: `playing`};

      store.state = {lives: 3, scores: 0, gameStatus: `playing`};
      assert.deepEqual(store.state, expected);
    });

    it(`должен обновить состояние, дополнив его новыми данными`, () => {
      const state = {lives: 3, scores: 0};
      const store = new Store(state);
      const expected = {lives: 3, scores: 0, gameStatus: `playing`};

      store.state = {gameStatus: `playing`};
      assert.deepEqual(store.state, expected);
    });

    it(`должен обновить состояние, перезаписав измененные данные`, () => {
      const state = {lives: 3, scores: 0};
      const store = new Store(state);
      const expected = {lives: 3, scores: 2, gameStatus: `playing`};

      store.state = {gameStatus: `playing`, scores: 2};
      assert.deepEqual(store.state, expected);
    });
  });

  describe(`Подписка на обновления`, () => {
    it(`должен добавить функция в массив обратных вызовов`, () => {
      const store = new Store();
      const callback = () => {};

      store.subscribe(callback);
      assert.include(store.callbacks, callback);
    });

    it(`должен вызвать callback после обновления состояния`, () => {
      let test = `original`;
      const store = new Store();
      const callback = () => {
        test = `changed`;
      };

      store.subscribe(callback);
      store.state = {};
      assert.equal(test, `changed`);
    });
  });
});

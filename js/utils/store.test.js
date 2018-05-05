import {assert} from 'chai';
import Store from './store';

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

      store.setState({lives: 3, scores: 0, gameStatus: `playing`});
      assert.deepEqual(store.state, expected);
    });

    it(`должен обновить состояние, дополнив его новыми данными`, () => {
      const state = {lives: 3, scores: 0};
      const store = new Store(state);
      const expected = {lives: 3, scores: 0, gameStatus: `playing`};

      store.setState({gameStatus: `playing`});
      assert.deepEqual(store.state, expected);
    });

    it(`должен обновить состояние, перезаписав измененные данные`, () => {
      const state = {lives: 3, scores: 0};
      const store = new Store(state);
      const expected = {lives: 3, scores: 2, gameStatus: `playing`};

      store.setState({gameStatus: `playing`, scores: 2});
      assert.deepEqual(store.state, expected);
    });
  });

  describe(`Подписка на обновления store`, () => {
    it(`должен добавить функция в массив обратных вызовов`, () => {
      const store = new Store();
      const callback = () => {};

      store.subscribe(callback);
      assert.include(store._callbacks, callback);
    });

    it(`должен вызвать callback после обновления состояния`, () => {
      let test = `original`;
      const store = new Store();
      const callback = () => {
        test = `changed`;
      };

      store.subscribe(callback);
      store.setState({});
      assert.equal(test, `changed`);
    });
  });

  describe(`Отписка от обновлний store`, () => {
    it(`должен должен убрать функцию из массива обратных вызовов`, () => {
      const store = new Store();
      const callback = () => {};

      store.subscribe(callback);
      store.unsubscribe(callback);

      assert.notInclude(store._callbacks, callback);
    });
  });
});

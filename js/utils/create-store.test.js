import {assert} from 'chai';
import CreateStore from './create-store';

describe(`Класс хранилища состояния приложения`, () => {
  it(`должен вернуть пустой объект состояния, если ничего не передали`, () => {
    const store = new CreateStore();
    const expected = {};

    assert.deepEqual(store.getState(), expected);
  });

  it(`должен установить в изначальное состояние переданный объект`, () => {
    const state = {lives: 3, scores: 0};
    const store = new CreateStore(state);

    assert.deepEqual(store.getState(), state);
  });

  it(`должен обновить состояние на переданный объект`, () => {
    const state = {lives: 3, scores: 0};
    const store = new CreateStore(state);
    const expected = {lives: 3, scores: 0, gameStatus: `playing`};

    store.setState({lives: 3, scores: 0, gameStatus: `playing`});
    assert.deepEqual(store.getState(), expected);
  });

  it(`должен обновить состояние, дополнив его новыми данными`, () => {
    const state = {lives: 3, scores: 0};
    const store = new CreateStore(state);
    const expected = {lives: 3, scores: 0, gameStatus: `playing`};

    store.setState({gameStatus: `playing`});
    assert.deepEqual(store.getState(), expected);
  });

  it(`должен обновить состояние, перезаписав измененные данные`, () => {
    const state = {lives: 3, scores: 0};
    const store = new CreateStore(state);
    const expected = {lives: 3, scores: 2, gameStatus: `playing`};

    store.setState({gameStatus: `playing`, scores: 2});
    assert.deepEqual(store.getState(), expected);
  });
});

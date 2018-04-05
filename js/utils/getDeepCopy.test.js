/* eslint-disable no-undefined */
import {assert} from 'chai';
import getDeepCopy from './getDeepCopy';

describe(`Получение глубокой копии объекта`, () => {
  it(`должен вернуть примитив, если передан не объект`, () => {
    assert.equal(getDeepCopy(4), 4);
    assert.equal(getDeepCopy(``), ``);
    assert.equal(getDeepCopy(true), true);
    assert.equal(getDeepCopy(null), null);
    assert.equal(getDeepCopy(undefined), undefined);
  });

  it(`должен склонировать массив`, () => {
    assert.deepEqual(getDeepCopy([]), []);
    assert.deepEqual(getDeepCopy([null, 1, [], true]), [null, 1, [], true]);
  });

  it(`должен склонировать объект`, () => {
    assert.deepEqual(getDeepCopy({}), {});
    assert.deepEqual(getDeepCopy({key1: 1, key2: [], key3: false}), {key1: 1, key2: [], key3: false});
  });

  it(`должен вернуть глубокую копию массива`, () => {
    const pushed = [{name: 1}, {name: 2}, {name: 3}];
    const expected = [{name: 1}, {name: 2}, {name: 3}];

    assert.deepEqual(getDeepCopy(pushed), expected);

    const inner = {a: `b`};
    const arr1 = [inner];
    const arr2 = getDeepCopy(arr1);
    inner.c = `d`;

    assert.notDeepEqual(arr1, arr2);
  });

  it(`должен вернуть глубокую копию объекта`, () => {
    const pushed = {name: `foo`, other: [{time: 12345}, {time: 54321}]};
    const expected = {name: `foo`, other: [{time: 12345}, {time: 54321}]};

    assert.deepEqual(expected, getDeepCopy(pushed));

    const one = {a: `b`};
    const two = getDeepCopy(one);
    two.c = `d`;

    assert.notDeepEqual(one, two);
  });
});

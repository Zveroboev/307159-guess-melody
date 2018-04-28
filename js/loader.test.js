import {assert} from 'chai';
import {deepFilter} from './loader';

describe(`Глубокий поиск по объекту`, () => {
  it(`должен вернуть пустой массив, если в объекте нет нужного ключа`, () => {
    const obj = {string: `test`, value: 1, itNull: null};

    assert.deepEqual(deepFilter(obj, `src`), []);
  });

  it(`должен вернуть массив с ключом, если в объекте есть нужный ключ`, () => {
    const obj = {src: `test`, value: 1, itNull: null};

    assert.deepEqual(deepFilter(obj, `src`), [`test`]);
  });

  it(`должен вернуть массив с ключом, если ключ находится во вложенном объекте`, () => {
    const nestedObj = {src: `test`};
    const obj = {value: 1, itNull: null, nestedObj};

    assert.deepEqual(deepFilter(obj, `src`), [`test`]);
  });

  it(`должен вернуть массив с ключами, если несколько ключей во вложенныъ объектах`, () => {
    const firstNestedObj = {first: {src: `2`}, second: {src: `3`}};
    const secondNestedObject = {src: `4`};
    const obj = {src: `1`, itNull: null, firstNestedObj, secondNestedObject};

    assert.deepEqual(deepFilter(obj, `src`), [`1`, `2`, `3`, `4`]);
  });
});

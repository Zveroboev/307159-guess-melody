/* eslint-disable no-undefined */
import {assert} from 'chai';
import getScored from './getScored';
import getDeepCopy from './getDeepCopy';

const answers = [
  {id: 1, current: true, time: 45000},
  {id: 2, current: true, time: 45000},
  {id: 3, current: true, time: 45000},
  {id: 4, current: true, time: 45000},
  {id: 5, current: true, time: 45000},
  {id: 6, current: true, time: 45000},
  {id: 7, current: true, time: 45000},
  {id: 8, current: true, time: 45000},
  {id: 9, current: true, time: 45000},
  {id: 10, current: true, time: 45000},
];

describe(`Подсчет результатов игры`, () => {
  it(`должен выбросить ошибку из-за неверных выходных параметров`, () => {
    assert.throws(() => getScored([], null));
    assert.throws(() => getScored([], undefined));
    assert.throws(() => getScored([], `1`));
    assert.throws(() => getScored([], true));
    assert.throws(() => getScored(null, 3));
    assert.throws(() => getScored(undefined, 2));
    assert.throws(() => getScored(`1`, 1));
    assert.throws(() => getScored({}, 2));
  });

  it(`должен вернуть -1 если правильных ответов меньше 10`, () => {
    const newAnswers = getDeepCopy(answers);
    newAnswers[0].current = false;

    assert.equal(getScored(newAnswers, 2), -1);
  });

  it(`должен вернуть 10 если игрок ответил на все вопросы верно и не быстро`, () => {
    assert.equal(getScored(answers, 3), 10);
  });

  it(`должен вернуть правильное колличество очков`, () => {
    const newAnswers = getDeepCopy(answers);
    newAnswers[0].time = 3000;

    assert.equal(getScored(newAnswers, 3), 11);
  });
});

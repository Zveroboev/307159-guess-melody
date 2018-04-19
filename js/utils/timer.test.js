import {assert} from 'chai';
import Timer from './timer';

describe(`Таймер`, () => {
  it(`Должен подсчитать количество оставшегося времени после тика`, () => {
    const timer = new Timer(20);

    timer.tick();
    assert.equal(timer.getTime(), 19);

    timer.tick();
    assert.equal(timer.getTime(), 18);
  });

  it(`Должен вернуть 0, если время вышло`, () => {
    const timer = new Timer(1);

    timer.tick();
    assert.equal(timer.getTime(), 0);
  });

  it(`Должен вернуть null, если передано отрицательное время`, () => {
    const timer = new Timer(-10);

    assert.equal(timer.getTime(), null);
  });

  it(`Должен начать тикать каждую секунду`, () => {
    const timer = new Timer(20);

    timer.start();

  });
});

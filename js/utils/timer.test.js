import {assert} from 'chai';
import Timer from './timer';
import Store from './create-store';

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

  it(`должен выполнить обратный вызов при тике`, () => {
    const timer = new Timer(20);
    let test = `original`;
    const callback = () => {
      test = `changed`;
    };

    timer.subscribe(callback);
    timer.tick();
    assert.equal(test, `changed`);
  });

  it(`Должен обновить состояние приложения при тике`, () => {
    const store = new Store({time: 20});
    const timer = new Timer(store.state.time);
    const callback = () => store.setState({time: timer.getTime()});

    timer.subscribe(callback);
    timer.tick();
    assert.equal(store.state.time, 19);
    timer.tick();
    timer.tick();
    assert.equal(store.state.time, 17);
  });
});

import {assert} from 'chai';
import Timer from './timer';
import Store from './create-store';

describe(`Таймер`, () => {
  describe(`Тики`, () => {
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

  describe(`Подсчет отображения кол-ва минут`, () => {
    it(`должен вернуть кол-во минут`, () => {
      const timer = new Timer(300);
      const expected = `05`;

      assert.strictEqual(timer.minutes, expected);
    });

    it(`должен вернуть кол-во минут (переданы параметры с остатком)`, () => {
      const timer = new Timer(281);
      const expected = `04`;

      assert.strictEqual(timer.minutes, expected);
    });

    it(`должен вернуть кол-во минут если передано число меньше одной минуты`, () => {
      const timer = new Timer(23);
      const expected = `00`;

      assert.strictEqual(timer.minutes, expected);
    });

    it(`должен вернуть кол-во минут если передано число больше 10 минут`, () => {
      const timer = new Timer(732);
      const expected = `12`;

      assert.strictEqual(timer.minutes, expected);
    });
  });

  describe(`Подсчет отображения кол-ва секунд`, () => {
    it(`должен вернуть кол-во секунд `, () => {
      const timer = new Timer(180);
      const expected = `00`;

      assert.strictEqual(timer.seconds, expected);
    });

    it(`должен вернуть кол-во секунд (переданы параметры с остатком)`, () => {
      const timer = new Timer(191);
      const expected = `11`;

      assert.strictEqual(timer.seconds, expected);
    });

    it(`должен вернуть кол-во секунд если секунд меньше 10`, () => {
      const timer = new Timer(188);
      const expected = `08`;

      assert.strictEqual(timer.seconds, expected);
    });
  });
});

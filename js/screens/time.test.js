import {assert} from 'chai';
import {getMinutes, getSeconds} from './time';

describe(`Компонент общего таймера`, () => {
  describe(`Подсчет отображения кол-ва минут`, () => {
    it(`должен вернуть кол-во минут если передано число кратное 1000`, () => {
      const time = 5000;
      const expected = `05`;

      assert.strictEqual(getMinutes(time), expected);
    });

    it(`должен вернуть кол-во минут если передано число не кратное 1000`, () => {
      const time = 3234;
      const expected = `03`;

      assert.strictEqual(getMinutes(time), expected);
    });

    it(`должен вернуть кол-во минут если передано число меньше одной минуты`, () => {
      const time = 234;
      const expected = `00`;

      assert.strictEqual(getMinutes(time), expected);
    });

    it(`должен вернуть кол-во минут если передано число больше 10 минут`, () => {
      const time = 12376;
      const expected = `12`;

      assert.strictEqual(getMinutes(time), expected);
    });
  });

  describe(`Подсчет отображения кол-ва секунд`, () => {
    it(`должен вернуть кол-во секунд если передано число кратное 1000`, () => {
      const time = 4200;
      const expected = `20`;

      assert.strictEqual(getSeconds(time), expected);
    });

    it(`должен вернуть кол-во секунд если передано число кратное 1000`, () => {
      const time = 5000;
      const expected = `00`;

      assert.strictEqual(getSeconds(time), expected);
    });

    it(`должен вернуть кол-во секунд если передано число не кратное 100`, () => {
      const time = 2342;
      const expected = `34`;

      assert.strictEqual(getSeconds(time), expected);
    });

    it(`должен вернуть кол-во секунд если секунд меньше 10`, () => {
      const time = 2020;
      const expected = `02`;

      assert.strictEqual(getSeconds(time), expected);
    });
  });
});

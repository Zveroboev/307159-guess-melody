import {assert} from 'chai';
import {getMinutes, getSeconds} from './time';

describe(`Компонент общего таймера`, () => {
  describe(`Подсчет отображения кол-ва минут`, () => {
    it(`должен вернуть кол-во минут`, () => {
      const time = 300000;
      const expected = `05`;

      assert.strictEqual(getMinutes(time), expected);
    });

    it(`должен вернуть кол-во минут (переданы параметры с остатком)`, () => {
      const time = 191234;
      const expected = `03`;

      assert.strictEqual(getMinutes(time), expected);
    });

    it(`должен вернуть кол-во минут если передано число меньше одной минуты`, () => {
      const time = 2342;
      const expected = `00`;

      assert.strictEqual(getMinutes(time), expected);
    });

    it(`должен вернуть кол-во минут если передано число больше 10 минут`, () => {
      const time = 722029;
      const expected = `12`;

      assert.strictEqual(getMinutes(time), expected);
    });
  });

  describe(`Подсчет отображения кол-ва секунд`, () => {
    it(`должен вернуть кол-во секунд `, () => {
      const time = 300000;
      const expected = `00`;

      assert.strictEqual(getSeconds(time), expected);
    });

    it(`должен вернуть кол-во секунд (переданы параметры с остатком)`, () => {
      const time = 191234;
      const expected = `11`;

      assert.strictEqual(getSeconds(time), expected);
    });

    it(`должен вернуть кол-во секунд если секунд меньше 10`, () => {
      const time = 188034;
      const expected = `08`;

      assert.strictEqual(getSeconds(time), expected);
    });
  });
});

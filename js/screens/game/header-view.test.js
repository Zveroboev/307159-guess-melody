import {assert} from 'chai';
import {getMinutes, getSeconds} from './header-view';

describe(`Компонент общего таймера`, () => {
  describe(`Подсчет отображения кол-ва минут`, () => {
    it(`должен вернуть кол-во минут`, () => {
      const time = 300;
      const expected = `05`;

      assert.strictEqual(getMinutes(time), expected);
    });

    it(`должен вернуть кол-во минут (переданы параметры с остатком)`, () => {
      const time = 281;
      const expected = `04`;

      assert.strictEqual(getMinutes(time), expected);
    });

    it(`должен вернуть кол-во минут если передано число меньше одной минуты`, () => {
      const time = 23;
      const expected = `00`;

      assert.strictEqual(getMinutes(time), expected);
    });

    it(`должен вернуть кол-во минут если передано число больше 10 минут`, () => {
      const time = 732;
      const expected = `12`;

      assert.strictEqual(getMinutes(time), expected);
    });
  });

  describe(`Подсчет отображения кол-ва секунд`, () => {
    it(`должен вернуть кол-во секунд `, () => {
      const time = 180;
      const expected = `00`;

      assert.strictEqual(getSeconds(time), expected);
    });

    it(`должен вернуть кол-во секунд (переданы параметры с остатком)`, () => {
      const time = 191;
      const expected = `11`;

      assert.strictEqual(getSeconds(time), expected);
    });

    it(`должен вернуть кол-во секунд если секунд меньше 10`, () => {
      const time = 188;
      const expected = `08`;

      assert.strictEqual(getSeconds(time), expected);
    });
  });
});

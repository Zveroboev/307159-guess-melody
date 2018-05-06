import {assert} from 'chai';
import declareNoun from './index';

describe(`Функция склонения существительных`, () => {
  describe(`Минуты`, () => {
    it(`должен вернуть слово для "1"`, () => {
      assert.equal(declareNoun(1, `минуту`, `минуты`, `минут`), `минуту`);
      assert.equal(declareNoun(71, `минуту`, `минуты`, `минут`), `минуту`);
      assert.equal(declareNoun(121, `минуту`, `минуты`, `минут`), `минуту`);
    });

    it(`должен вернуть слово для "3"`, () => {
      assert.equal(declareNoun(3, `минуту`, `минуты`, `минут`), `минуты`);
      assert.equal(declareNoun(22, `минуту`, `минуты`, `минут`), `минуты`);
      assert.equal(declareNoun(132, `минуту`, `минуты`, `минут`), `минуты`);
    });

    it(`должен вернуть слово для "5"`, () => {
      assert.equal(declareNoun(5, `минуту`, `минуты`, `минут`), `минут`);
      assert.equal(declareNoun(19, `минуту`, `минуты`, `минут`), `минут`);
      assert.equal(declareNoun(139, `минуту`, `минуты`, `минут`), `минут`);
    });
  });

  describe(`Секунды`, () => {
    it(`должен вернуть слово для "1"`, () => {
      assert.equal(declareNoun(1, `секунду`, `секунды`, `секунд`), `секунду`);
      assert.equal(declareNoun(71, `секунду`, `секунды`, `секунд`), `секунду`);
      assert.equal(declareNoun(121, `секунду`, `секунды`, `секунд`), `секунду`);
    });

    it(`должен вернуть слово для "3"`, () => {
      assert.equal(declareNoun(3, `секунду`, `секунды`, `секунд`), `секунды`);
      assert.equal(declareNoun(22, `секунду`, `секунды`, `секунд`), `секунды`);
      assert.equal(declareNoun(132, `секунду`, `секунды`, `секунд`), `секунды`);
    });

    it(`должен вернуть слово для "5"`, () => {
      assert.equal(declareNoun(5, `секунду`, `секунды`, `секунд`), `секунд`);
      assert.equal(declareNoun(19, `секунду`, `секунды`, `секунд`), `секунд`);
      assert.equal(declareNoun(139, `секунду`, `секунды`, `секунд`), `секунд`);
    });
  });

  describe(`Разы`, () => {
    it(`должен вернуть слово для "1"`, () => {
      assert.equal(declareNoun(1, `раз`, `раза`, `раз`), `раз`);
      assert.equal(declareNoun(71, `раз`, `раза`, `раз`), `раз`);
      assert.equal(declareNoun(121, `раз`, `раза`, `раз`), `раз`);
    });

    it(`должен вернуть слово для "3"`, () => {
      assert.equal(declareNoun(3, `раз`, `раза`, `раз`), `раза`);
      assert.equal(declareNoun(22, `раз`, `раза`, `раз`), `раза`);
      assert.equal(declareNoun(132, `раз`, `раза`, `раз`), `раза`);
    });

    it(`должен вернуть слово для "5"`, () => {
      assert.equal(declareNoun(5, `раз`, `раза`, `раз`), `раз`);
      assert.equal(declareNoun(19, `раз`, `раза`, `раз`), `раз`);
      assert.equal(declareNoun(139, `раз`, `раза`, `раз`), `раз`);
    });
  });

});

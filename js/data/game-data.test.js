import {assert} from 'chai';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });

    it(`should return current index`, () => {
      assert.equal(3, [1, 3, 4, 18].indexOf(18));
      assert.equal(1, [1, 3, 4, 18].indexOf(3));
    });
  });
});

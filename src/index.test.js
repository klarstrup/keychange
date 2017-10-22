/* eslint-env jest */

jest.useFakeTimers();

const keychange = require('./index.js').default;

const keyFn = jest.fn();

const anotherkeyFn = jest.fn();

it('Calls the handlers of differing values.', () => {
  expect.assertions(2);
  keychange(
    {
      key: keyFn,
      anotherkey: anotherkeyFn,
    },
    { key: 'value', anotherkey: 'value' },
    { key: 'anothervalue', anotherkey: 'value' },
  );
  expect(keyFn.mock.calls.length).toBe(1);
  expect(anotherkeyFn.mock.calls.length).toBe(0);
});

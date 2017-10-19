/* eslint-env jest */

jest.useFakeTimers();

const keychange = require('./index.js').default;

const keyFn = jest.fn();

const anotherkeyFn = jest.fn();

it('Calls the handlers of differing values.', () => {
  expect.assertions(2);
  keychange(
    { key: 'value', anotherkey: 'value' },
    { key: 'anothervalue', anotherkey: 'value' },
    {
      key: keyFn,
      anotherkey: anotherkeyFn,
    },
  );
  expect(keyFn.mock.calls.length).toBe(1);
  expect(anotherkeyFn.mock.calls.length).toBe(0);
});

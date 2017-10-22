/* eslint-env jest */

jest.useFakeTimers();

const keychange = require('./index.js').default;

it('Calls the handlers of differing values.', () => {
  const keyFn = jest.fn();
  const anotherkeyFn = jest.fn();
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

it('Is curried.', () => {
  const keyFn = jest.fn();
  const anotherkeyFn = jest.fn();

  expect.assertions(3);
  const kcfn = keychange({
    key: keyFn,
    anotherkey: anotherkeyFn,
  })({ key: 'value', anotherkey: 'value' });
  expect(keyFn.mock.calls.length).toBe(0);
  kcfn({ key: 'anothervalue', anotherkey: 'value' });
  expect(keyFn.mock.calls.length).toBe(1);
  expect(anotherkeyFn.mock.calls.length).toBe(0);
});

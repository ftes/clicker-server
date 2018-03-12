import { preserve } from './js-object';

it('preserve: preserves where true and nothing else', () => {
  const toPreserve = {
    a: true,
    b: true,
  };

  const object = {
    a: 1,
    b: 2,
    c: 3,
  };

  const result = preserve(object, toPreserve);
  expect(result.a).toEqual(1);
  expect(result.b).toEqual(2);
  expect(result.c).not.toBeDefined();
});

it('preserve: works on deep objects', () => {
  const toPreserve = {
    a: {
      b: true,
    },
  };

  const object = {
    a: {
      a: 1,
      b: 2,
    },
  };

  const result = preserve(object, toPreserve);
  expect(result.a.b).toEqual(2);
  expect(result.a.a).not.toBeDefined();
});

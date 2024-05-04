import R from 'ramda';
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

type Split = (delim: string) => (str: string) => string[]
const split: Split = (delim) => (str) => str.split(delim);

type StrToNumber = (str: string) => number;
const strToNumber: StrToNumber = (str) => parseFloat(str);

type Div = (arr: number[]) => number;
const div: Div = ([a, b]) => b / a;

type Double = (x: number) => number;
const double: Double = (x) => x * 2;

console.log(
  split(',')('1,2'),
  strToNumber('12'),
  div([2, 10]),
);

const f = R.compose(div, R.map(strToNumber), split(','))

console.log(
  '1,2', f('1,2'), '\n',
  '2,10', f('2,10'), '\n',
  '3,15', f('3,15'), '\n',
);

console.log();
console.log('example of bad input: ');
console.log();

console.log(
  '0,2', f('0,2'), '\n',
  '2', f('2'), '\n',
  'not_a_number', f('not_a_number'), '\n',
);

// Maybe Monad

// @ts-ignore
const some = (v) => ({
  v,
  // @ts-ignore
  map: (f) => some(f(v)),
  // @ts-ignore
  bind: (f) => f(v)
});

const none = () => ({
  v: null,
  // @ts-ignore
  map: (f) => none(),
  // @ts-ignore
  bind: (f) => none(),
});

// @ts-ignore
const _div = ([a, b]) => {
  if (a === 0) return none();
  return some(b / a);
}

const _strToNumber = (str: string) => {
  const value = parseFloat(str);
  if (isNaN(value)) return none();
  return some(value);
};

// @ts-ignore
const _split = (delim) => (str) => {
  const value = str.split(delim);
  if (value.length === 2) return some(value);
  return none();
};

console.log(
  some('2,10')
    .map(split(','))
    .map(R.map(strToNumber))
    .map(div)
    .bind((x: number): number => x)
);

console.log(
  '0,10',
  some('0,10')
    .bind(_split(','))
    .bind(
      R.compose(
        // @ts-ignore
        (arr) => arr.filter(Boolean).length === 2 ? some(arr) : none(),
        R.map(strToNumber)
      )
    )
    .bind(_div)
    .v
);

console.log(
  'x,10',
  some('x,10')
    .bind(_split(','))
    .bind(
      R.compose(
        // @ts-ignore
        (arr) => arr.filter(Boolean).length === 2 ? some(arr) : none(),
        R.map(strToNumber)
      )
    )
    .bind(_div)
    .v
);

console.log(
  '10',
  some('10')
    .bind(_split(','))
    .bind(
      R.compose(
        // @ts-ignore
        (arr) => arr.filter(Boolean).length === 2 ? some(arr) : none(),
        R.map(strToNumber)
      )
    )
    .bind(_div)
    .v
);

console.log(
  '2,10',
  some('2,10')
    .bind(_split(','))
    .bind(
      R.compose(
        // @ts-ignore
        (arr) => arr.filter(Boolean).length === 2 ? some(arr) : none(),
        R.map(strToNumber)
      )
    )
    .bind(_div)
    .map(double)
    .v
);

console.log('using fp-ts\n\n\n');

const __split = (delim: string) => (str: string) => {
  const value = str.split(delim);
  if (value.length === 2) return O.some(value);
  return O.none;
}

const __strToNumber = (str: string) => {
  const value = parseFloat(str);
  if (isNaN(value)) return O.none;
  return O.some(value);
};

const __div = ([a, b]: number[]) => {
  if (a === 0) return O.none;
  return O.some(b / a);
}

console.log(
  pipe(
    '3, 15',
    split(','),
    R.map(strToNumber),
    __div,
    O.map(double),
    O.match(
      () => 'no result', // onNone handler
      (res) => `Result: ${res}` // onSome handler
    )
  )
);

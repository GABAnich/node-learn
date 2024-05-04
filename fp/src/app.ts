import R from 'ramda';

type Split = (delim: string) => (str: string) => string[]
const split: Split = (delim) => (str) => str.split(delim);

type StrToNumber = (str: string) => number;
const strToNumber: StrToNumber = (str) => parseFloat(str);

type Div = (arr: number[]) => number;
const div: Div = ([a, b]) => b / a;

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

// {ValueOrError} Monad

type ValueOrError<T> = { value: T } | {error: string };
const wrapValueOrError = <T>(value: T): ValueOrError<T> => ({ value });

type _Div = (arr: number[]) => ValueOrError<number>;
const _div: _Div = ([a, b]) => {
  if (a === 0) return { error: "can't divide by 0" };
  return { value: b / a };
}

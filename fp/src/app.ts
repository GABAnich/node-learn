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
  f('1,2'),
  f('2,10'),
  f('3,15'),
);

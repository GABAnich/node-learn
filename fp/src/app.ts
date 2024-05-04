import R from 'ramda';

type Split = (delim: string) => (str: string) => string[]
const split: Split = (delim) => (str) => str.split(delim);

type StrToNumber = (str: string) => number;
const strToNumber: StrToNumber = (str) => parseFloat(str);

type Div = ([a, b]: [number, number]) => number;
const div: Div = ([a, b]) => b / a;

console.log(
  split(',')('1,2'),
  strToNumber('12'),
  div([2, 10]),
);

/*
console.log(
  R.compose(div, strToNumber, split)('1,2')
);
*/

type Split = (delim: string) => (str: string) => string[]
const split: Split = (delim) => (str) => str.split(delim);

type StrToNumber = (str: string) => number;
const strToNumber: StrToNumber = (str) => parseFloat(str);

type Div = (a: number) => (b: number) => number;
const div: Div = (a) => (b) => b / a;

console.log(
  split(',')('1,2'),
  strToNumber('12'),
  div(2)(10),
);

console.log(
);

// @ts-nocheck
console.log('λ boolean logic');

const TRUE = (a) => (_) => a;
const FALSE = (_) => (b) => b;
const NOT = (a) => a(FALSE)(TRUE);
const AND = (a) => (b) => a(b)(FALSE);
const OR = (a) => (b) => a(TRUE)(b);
const COND = (b) => (p) => (q) => b(p)(q)

console.log(TRUE, 'TRUE');
console.log(FALSE, 'FALSE');
console.log('\n');
console.log(NOT(FALSE), 'TRUE')
console.log(NOT(TRUE), 'FALSE')
console.log('\n');
console.log(AND(TRUE)(TRUE), 'TRUE');
console.log(AND(TRUE)(FALSE), 'FALSE');
console.log(AND(FALSE)(TRUE), 'FALSE');
console.log(AND(FALSE)(FALSE), 'FALSE');
console.log('\n');
console.log(OR(TRUE)(TRUE), 'TRUE');
console.log(OR(TRUE)(FALSE), 'TRUE');
console.log(OR(FALSE)(TRUE), 'TRUE');
console.log(OR(FALSE)(FALSE), 'FALSE');
console.log('\n');
console.log(COND(TRUE)(() => 'when true')(() => 'when false')(), 'when true');
console.log(COND(FALSE)(() => 'when true')(() => 'when false')(), 'when false');
console.log(COND(OR(TRUE)(FALSE))(() => 'when true')(() => 'when false')(), 'when true');
console.log('\n');


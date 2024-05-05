import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function'

type Wait = (ms: number) => Promise<void>;
const wait: Wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

type GetString = () => Promise<string>;
const getString = () => Promise.resolve("some_string");

const addSuffix = (suffix: string) => (text: string) => `${text} ${suffix}`;

/*
const f = pipe(
  getString,
  T.map(addSuffix('hmmm'))
)

console.log(
  f().then(console.log)
)
*/

type MightFail = () => Promise<string>;
const mightFail = () => new Promise((resolve, reject) => {
  if (Math.random() < 0.2) {
    reject({ error: "something went wrong" });
  } else {
    resolve("some_data")
  }
})

const g = pipe(
  TE.tryCatch(
    mightFail,
    (resason) => resason,
  ),
);

console.log(
  g().then(console.log)
);

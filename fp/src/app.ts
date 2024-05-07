import * as E from 'fp-ts/Either';
import { pipe, identity } from 'fp-ts/function'

interface Stream {
  start: number;
  end: number;
  duration?: number;
};

const validateDate = (stream: Stream): boolean => stream.start < stream.end;

const addDuration = (stream: Stream): Stream => ({ ...stream, duration: stream.end - stream.start  })

const stream1 = { start: 10, end: 30 };
const stream2 = { start: 100, end: 40 };

const res = pipe(
  stream1,
  E.of,
  E.filterOrElse(validateDate, () => 'invalid start & end'),
  E.map(addDuration),
  E.foldW((e) => { console.log(`error: ${e}`); return e;  }, identity),
)

console.log(res)


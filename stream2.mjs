import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

let count = 0;

const processChunk = async (chunk, { signal }) => {
  if (chunk.includes('payload')) {
    count += 1;
    console.log(count);
  };
  return chunk;
};

await pipeline
(
  createReadStream('in.json'),
  async function*(source, { signal }) {
    source.setEncoding('utf8');
    for await (const chunk of source) {
      yield await processChunk(chunk, { signal });
    }
  },
  createWriteStream('out.json')
);

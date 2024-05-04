import * as O from 'fp-ts/Option';
import { flow, pipe } from 'fp-ts/function'

interface User {
  isDeleted: boolean;
  name: string;
  email: string;
  role?: 'member',
  lastViewedVideo?: { title: string; likesNumber: number };
};
const validUser: User = {
  isDeleted: false,
  name: 'alice',
  email: 'alice@mail.com',
  role: 'member',
  lastViewedVideo: { title: 'video1', likesNumber: 255 },
};
const invalidUser: User = {
  isDeleted: true,
  name: 'bob',
  email: 'bob@mail.com',
};

type F = (user: User) => { errMessage: string } | { email: string; text: string };
const imperative: F = (user) => {
  if (user.isDeleted) return { errMessage: 'user is deleted' };
  if (!user.lastViewedVideo) return { errMessage: 'user has no lastViewedVideo' };
  return {
    email: user.email,
    text: `Hello, ${user.name.toUpperCase()}. The video ${user.lastViewedVideo.title} has ${user.lastViewedVideo.likesNumber} likes`,
  };
};

const declarative: F = (user) => pipe(
  user,
  () => ({ errMessage: 'todo' }),
);

console.log(imperative(validUser), declarative(validUser));
console.log(imperative(invalidUser), declarative(invalidUser));

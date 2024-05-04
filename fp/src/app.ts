import * as O from 'fp-ts/Option';
import { flow, pipe } from 'fp-ts/function'

interface User {
  isDeleted: boolean;
  email: string;
  role?: 'member',
  lastViewedVideo?: { title: string; likesNumber: number };
};
const validUser: User = {
  isDeleted: false,
  email: 'u@mail.com',
  role: 'member',
  lastViewedVideo: { title: 'video1', likesNumber: 255 },
};
const invalidUser: User = {
  isDeleted: true,
  email: 'u2@mail.com',
};

const imperative = (user: User) => {

};

const declarative = (user: User) => {

};

console.log(imperative(validUser));

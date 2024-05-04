import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function'

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
const userWithNoLastViewedVideo: User = {
  isDeleted: false,
  name: 'alice',
  email: 'alice@mail.com',
  role: 'member',
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

type GetValidUser = (user: User) => E.Either<string, User>;
const getValidUser: GetValidUser = (user) => user.isDeleted ? E.left('user is deleted') : E.right(user);
const addEmail = (user: User) => ({ user, email: user.email });

type AddText = (res: { user: User, email: string }) => E.Either<string, { user: User, email: string, text: string }>;
const addText: AddText = (res) => {
  if (!res.user.lastViewedVideo) return E.left('user has not lastViewedVideo');
  return E.right({
    ...res,
    text: `Hello, ${res.user.name.toUpperCase()}. The video ${res.user.lastViewedVideo.title} has ${res.user.lastViewedVideo.likesNumber} likes`,
  })
};

type RemoveUser = (res: { user: User, email: string, text: string }) => { email: string; text: string };
const removeUser: RemoveUser = (res) => ({ email: res.email, text: res.text });
const declarative: F = (user) => pipe(
  user,
  getValidUser,
  E.map(addEmail),
  E.flatMap(addText),
  E.map(removeUser),
  E.foldW((e) => ({ errMessage: e }), (a) => a),
);

console.log(imperative(validUser), declarative(validUser), '\n');
console.log(imperative(userWithNoLastViewedVideo), declarative(userWithNoLastViewedVideo), '\n');
console.log(imperative(invalidUser), declarative(invalidUser), '\n');

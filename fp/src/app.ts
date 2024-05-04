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

const isUserValid = (user: User): boolean => !user.isDeleted;
const addEmail = (user: User) => ({ user, email: user.email });
type AddText = (res: { user: User, email: string }) => { user: User, email: string, text: string };
const addText: AddText = (res) => ({
  ...res,
  text: `Hello, ${res.user.name.toUpperCase()}. The video ${res.user?.lastViewedVideo?.title} has ${res.user?.lastViewedVideo?.likesNumber} likes`,
});
type RemoveUser = (res: { user: User, email: string, text: string }) => { email: string; text: string };
const removeUser: RemoveUser = (res) => ({ email: res.email, text: res.text });
const declarative: F = (user) => pipe(
  user,
  O.fromPredicate(isUserValid),
  O.map(addEmail),
  O.map(addText),
  O.map(removeUser),
  O.matchW(
    () => ({ errMessage: 'something went wrong' }),
    (res) => res,
  ),
);

console.log(imperative(validUser), declarative(validUser));
console.log(imperative(invalidUser), declarative(invalidUser));

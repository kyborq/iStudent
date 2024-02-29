import { atom } from 'jotai';

import { User } from '../api/models/userModel';

export const authAtom = atom<User | null>(null);

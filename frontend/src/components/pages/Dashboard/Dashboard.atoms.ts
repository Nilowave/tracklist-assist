import { atom } from 'jotai';
import { DBCardData } from '../../../api/api.types';

export const cardsAtom = atom<Array<DBCardData>>([]);
export const shouldFetchAtom = atom<boolean>(true);

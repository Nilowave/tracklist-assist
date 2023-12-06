import { atom } from 'jotai';

export type DialogAtom = {
  open: boolean;
  title: string;
  text: string;
  confirm: string;
  reject?: string;
  bold?: string;
};
export const dialogAtom = atom<DialogAtom>({ open: false, title: '', text: '', confirm: 'Great!' });

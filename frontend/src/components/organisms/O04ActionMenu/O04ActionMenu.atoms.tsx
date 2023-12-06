import { atomWithStorage } from 'jotai/utils';

export const columnDisplayAtom = atomWithStorage<'single' | 'double'>('grid-display', 'double');
export const openActionsAtom = atomWithStorage<boolean>('open-actions-menu', false);

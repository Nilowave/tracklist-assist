import { atomWithStorage } from 'jotai/utils';

export const expandedAtom = atomWithStorage<string | null>('expanded-card-id', null);

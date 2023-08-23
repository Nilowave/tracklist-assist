import { DBCardData, Sorting } from '../api/api.types';

export const sortCards = (cards: Array<DBCardData>, sorting?: Sorting) => {
  console.log(sorting);

  return cards.sort((a, b) => ((a.last || 0) > (b.last || 0) ? -1 : 1));
};

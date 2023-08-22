import { fromPairs } from 'lodash';

const minZIndex = 0;

const levels = ['topNav', 'sideNav', 'modal'];

const zIndexify = (labels: Array<string>) => {
  return fromPairs(labels.map((label, index) => [label, minZIndex + index]));
};

export const zIndex = zIndexify(levels);

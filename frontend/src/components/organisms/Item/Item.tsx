import type { ReactElement } from 'react';
import { formatDistance } from 'date-fns';
import { slideFade } from '../../../utils/motionTransitions';
import * as S from './Item.styles';

export type ItemData = {
  name: string;
  tracks?: Array<string>;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

interface ItemProps {
  data: ItemData;
  onClick: (id: string) => void;
}

export const Item = ({ data, onClick }: ItemProps): ReactElement => {
  const date = new Date(data.tracks?.slice(-1)[0] || '');
  const count = data.tracks?.length || 0;
  const distance = formatDistance(date || new Date(), new Date(), { addSuffix: true });

  const handleClick = () => {
    console.log(data);

    data._id && onClick(data._id);
  };
  return (
    <S.Item layout variants={{ ...slideFade('x', 0.7).variants }} onClick={handleClick}>
      <S.Title>{data.name}</S.Title>
      <S.Date>{distance}</S.Date>
      {count > 1 && (
        <S.Count>
          <span>{count}</span>
        </S.Count>
      )}
    </S.Item>
  );
};

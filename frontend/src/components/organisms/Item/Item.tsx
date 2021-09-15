import type { ReactElement } from 'react';
import { slideFade } from '../../../utils/motionTransitions';
import * as S from './Item.styles';

export type ItemData = {
  name: string;
  tracks: Array<string>;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  lastTrack?: string;
};

interface ItemProps {
  data: ItemData;
  onClick: (id: string) => void;
}

export const Item = ({ data, onClick }: ItemProps): ReactElement => {
  const count = data.tracks?.length || 0;
  console.log(data);

  const handleClick = () => {
    data._id && onClick(data._id);
  };

  return (
    <S.Item layout variants={{ ...slideFade('x', 0.7).variants }} onClick={handleClick}>
      <S.Title>{data.name}</S.Title>
      <S.Date>{data.lastTrack}</S.Date>
      {count > 1 && (
        <S.Count>
          <span>{count}</span>
        </S.Count>
      )}
    </S.Item>
  );
};

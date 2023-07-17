import type { ReactElement } from 'react';
import { slideFade } from '../../../utils/motionTransitions';
import * as S from './O01DashboardCard.styles';
import { A02Counter } from '../../atoms/A02Counter/A02Counter';

export type CardData = {
  name: string;
  tracks: Array<number>;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  lastTrack?: string;
  average?: Duration;
  intervals?: Array<Duration>;
};

interface O01DashboardCardProps {
  data: CardData;
  onClick: (id: string) => void;
}

export const O01DashboardCard = ({ data, onClick }: O01DashboardCardProps): ReactElement => {
  const count = data.tracks?.length || 0;

  const handleClick = () => {
    data._id && onClick(data._id);
  };

  return (
    <S.O01DashboardCard layout variants={{ ...slideFade('y', 0.7).variants }} onClick={handleClick}>
      <S.Border>
        <div />
      </S.Border>
      <S.Content>
        <S.TitleWrapper>
          <S.Title>{data.name}</S.Title>
          <S.Date>{data.lastTrack}</S.Date>
        </S.TitleWrapper>
        <A02Counter count={count} />
      </S.Content>
    </S.O01DashboardCard>
  );
};

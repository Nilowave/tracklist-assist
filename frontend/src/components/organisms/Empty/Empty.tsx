import type { ReactElement } from 'react';
import * as S from './Empty.styles';

export const Empty = (): ReactElement => {
  return (
    <S.EmptyMessage>
      <p>Ohh.. it looks like you&apos;re not tracking anything</p>
    </S.EmptyMessage>
  );
};

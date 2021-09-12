import type { ReactElement } from 'react';
import * as S from './Empty.styles';

export type ItemData = {
  name: string;
  tracks: Array<string>;
};

export const Empty = (): ReactElement => {
  return (
    <S.EmptyMessage>
      <p>Ohh.. it looks like you&apos;re not tracking anything</p>
      <p>Just say &quot;Ok Google... track Green Tea&quot;</p>
    </S.EmptyMessage>
  );
};

import { ReactElement } from 'react';
import * as S from './A02Counter.styles';
import { Text } from '../A03Text/A03Text.styles';

interface A02CounterProps {
  count: number;
}

export const A02Counter = ({ count }: A02CounterProps): ReactElement => {
  return (
    <S.A02Counter>
      <Text $type="tinyTitle">{count}</Text>
    </S.A02Counter>
  );
};

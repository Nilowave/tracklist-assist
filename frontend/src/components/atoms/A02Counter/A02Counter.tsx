import { ReactElement } from 'react';
import * as S from './A02Counter.styles';

interface A02CounterProps {
  count: number;
}

export const A02Counter = ({ count }: A02CounterProps): ReactElement => {
  return <S.A02Counter>{count}</S.A02Counter>;
};

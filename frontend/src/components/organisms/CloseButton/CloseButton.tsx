import type { ReactElement } from 'react';
import { useDeviceState } from '../../../hooks/useDeviceState';
import * as S from './CloseButton.styles';

export type ItemData = {
  name: string;
  tracks: Array<string>;
};

interface CloseButtonProps {
  onClick?: () => void;
  label?: string;
}

export const CloseButton = ({ onClick, label }: CloseButtonProps): ReactElement => {
  const { isMobile } = useDeviceState();
  return (
    <S.StyledButton onClick={onClick}>
      {(!isMobile || label) && <S.Label>{label || 'Close'}</S.Label>}
      <S.Icon />
    </S.StyledButton>
  );
};

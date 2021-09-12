import type { ReactElement } from 'react';
import { useDeviceState } from '../../../hooks/useDeviceState';
import * as S from './DeleteButton.styles';

interface DeleteButtonProps {
  onClick?: () => void;
  label?: string;
}

export const DeleteButton = ({ onClick, label }: DeleteButtonProps): ReactElement => {
  const { isMobile } = useDeviceState();
  return (
    <S.StyledButton onClick={onClick}>
      {(!isMobile || label) && <S.Label>{label || 'Add'}</S.Label>}
      <S.Icon />
    </S.StyledButton>
  );
};

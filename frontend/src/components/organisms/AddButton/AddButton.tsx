import type { ReactElement } from 'react';
import { useDeviceState } from '../../../hooks/useDeviceState';
import * as S from './AddButton.styles';

interface AddButtonProps {
  onClick?: () => void;
  label?: string;
}

export const AddButton = ({ onClick, label }: AddButtonProps): ReactElement => {
  const { isMobile } = useDeviceState();
  return (
    <S.StyledButton onClick={onClick}>
      {(!isMobile || label) && <S.Label>{label || 'Add'}</S.Label>}
      <S.Icon />
    </S.StyledButton>
  );
};

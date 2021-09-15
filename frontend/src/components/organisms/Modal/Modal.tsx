import type { ReactElement, ReactNode } from 'react';
import { fade, scale } from '../../../utils/motionTransitions';
import * as S from './Modal.styles';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ children, onClose }: ModalProps): ReactElement => {
  return (
    <S.Wrapper>
      <S.Background {...fade()} />
      <S.CloseButton animate onClick={onClose} icon="Close" />
      <S.Content {...scale(0.9)}>{children}</S.Content>
    </S.Wrapper>
  );
};

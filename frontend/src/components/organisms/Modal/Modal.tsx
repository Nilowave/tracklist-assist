import type { ReactElement, ReactNode } from 'react';
import * as S from './Modal.styles';
import { fade, scale } from '../../../utils/motionTransitions';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ children, onClose }: ModalProps): ReactElement => {
  return (
    <S.Wrapper>
      <S.Background onClick={onClose} {...fade()} />
      <S.CloseButton animate onClick={onClose} icon="close" />
      <S.Content {...scale(0.9)}>{children}</S.Content>
    </S.Wrapper>
  );
};

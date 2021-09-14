import type { ReactElement } from 'react';
import * as S from './Button.styles';
import * as icons from '../Icon/Icon';
import { scale } from '../../../utils/motionTransitions';

interface StyledButtonProps extends S.ButtonProps {
  className?: string;
  onClick?: () => void;
  label?: string;
  icon?: keyof typeof icons;
  animate?: boolean;
}

export const Button = ({ className, onClick, label, icon, color, textColor, animate, disable, size }: StyledButtonProps): ReactElement => {
  const Icon = icon && icons[icon];

  return (
    <S.StyledButton
      {...(animate && scale())}
      size={size}
      className={className}
      color={color}
      disable={disable}
      textColor={textColor}
      onClick={onClick}
    >
      {label && <S.Label>{label}</S.Label>}
      {Icon && (
        <S.Icon>
          <Icon />
        </S.Icon>
      )}
    </S.StyledButton>
  );
};

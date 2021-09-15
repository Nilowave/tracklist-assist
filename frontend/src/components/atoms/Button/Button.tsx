import type { ReactElement } from 'react';
import * as S from './Button.styles';
import * as icons from '../Icon/Icon';
import { scale } from '../../../utils/motionTransitions';

interface StyledButtonProps extends S.ButtonProps {
  className?: string;
  onClick?: () => void;
  label?: string;
  icon?: keyof typeof icons;
  type?: 'button' | 'submit';
  animate?: boolean;
}

export const Button = ({
  className,
  onClick,
  label,
  icon,
  color,
  textColor,
  animate,
  disable,
  size,
  type,
}: StyledButtonProps): ReactElement => {
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
      type={type}
    >
      {label && <S.Label>{label}</S.Label>}
      {Icon && (
        <S.Icon>
          <Icon fill={color} />
        </S.Icon>
      )}
    </S.StyledButton>
  );
};

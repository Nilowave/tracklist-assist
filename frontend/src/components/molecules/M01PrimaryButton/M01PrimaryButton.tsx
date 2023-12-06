import type { ReactElement } from 'react';
import * as S from './M01PrimaryButton.styles';
import { ColorKey } from '../../../styles/theme/default';
import { scale } from '../../../utils/motionTransitions';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';
import { Icon } from '../../atoms/A01Icon/icons';

export interface StyledButtonProps {
  className?: string;
  onClick?: () => void;
  text?: string;
  type?: 'button' | 'submit';
  animate?: boolean;
  color?: ColorKey;
  textColor?: ColorKey;
  disable?: boolean;
  size?: 'small' | 'regular' | 'medium';
  icon?: Icon;
}

export const M01PrimaryButton = ({
  className,
  onClick,
  text,
  icon,
  color,
  textColor,
  animate,
  disable,
  size,
  type,
}: StyledButtonProps): ReactElement => {
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
      icon={icon}
      text={text}
    >
      {text && <S.Label>{text}</S.Label>}
      {icon && <A01Icon name={icon} />}
    </S.StyledButton>
  );
};

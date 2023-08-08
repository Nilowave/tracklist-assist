import { MouseEvent, ReactElement } from 'react';
import * as S from './M02IconButton.styles';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';
import { Icon } from '../../atoms/A01Icon/icons';
import { A04Tooltip } from '../../atoms/A04Tooltip/A04Tooltip';

interface M02iconbuttonProps {
  icon: Icon;
  iconSize?: number;
  tooltip?: string;
  text?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  fill?: 'solid' | 'transparent';
}

export const M02IconButton = ({
  icon,
  tooltip,
  text,
  className,
  disabled,
  fill,
  iconSize = 19,
  onClick,
}: M02iconbuttonProps): ReactElement => {
  return (
    <S.StyledM02IconButton disabled={disabled} onClick={onClick} $isText={!!text} className={className} $fill={fill}>
      <A04Tooltip title={tooltip} placement="top" describeChild>
        <span>
          <S.IconWrapper $isText={!!text} $fill={fill}>
            <A01Icon name={icon} size={iconSize} />
          </S.IconWrapper>
          {text && <S.Label $type="body">{text}</S.Label>}
        </span>
      </A04Tooltip>
    </S.StyledM02IconButton>
  );
};

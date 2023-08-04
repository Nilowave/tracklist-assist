import { TooltipProps } from '@mui/material/Tooltip';
import { ReactElement } from 'react';
import * as S from './M02IconButton.styles';
import { ColorKey } from '../../../styles/theme/default';
import { LightTooltip } from '../../../styles/ui';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';
import { Icon } from '../../atoms/A01Icon/icons';

interface M02iconbuttonProps {
  icon: Icon;
  tooltip?: string;
  tooltipPlacement?: TooltipProps['placement'];
  text?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  fill?: 'solid' | 'transparent';
  color?: ColorKey;
}

export const M02IconButton = ({
  icon,
  tooltip,
  text,
  className,
  disabled,
  fill,
  color,
  tooltipPlacement = 'top',
  onClick,
}: M02iconbuttonProps): ReactElement => {
  return (
    <S.StyledM02IconButton disabled={disabled} onClick={onClick} $isText={!!text} className={className} $fill={fill}>
      <LightTooltip title={tooltip} placement={tooltipPlacement} describeChild>
        <span>
          <S.IconWrapper $isText={!!text} $fill={fill} $color={color}>
            <A01Icon name={icon} size={19} />
          </S.IconWrapper>
          {text && <S.Label type="body">{text}</S.Label>}
        </span>
      </LightTooltip>
    </S.StyledM02IconButton>
  );
};

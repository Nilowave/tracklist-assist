import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { ReactElement } from 'react';
import * as S from './M02IconButton.styles';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';
import { Icon } from '../../atoms/A01Icon/icons';

interface M02iconbuttonProps {
  icon: Icon;
  tooltip?: string;
  text?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  fill?: 'solid' | 'transparent';
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  })
);

export const M02IconButton = ({ icon, tooltip, text, className, disabled, fill, onClick }: M02iconbuttonProps): ReactElement => {
  return (
    <S.StyledM02IconButton disabled={disabled} onClick={onClick} $isText={!!text} className={className} $fill={fill}>
      <LightTooltip title={tooltip} placement="top" describeChild>
        <span>
          <S.IconWrapper $isText={!!text} $fill={fill}>
            <A01Icon name={icon} size={19} />
          </S.IconWrapper>
          {text && <S.Label type="body">{text}</S.Label>}
        </span>
      </LightTooltip>
    </S.StyledM02IconButton>
  );
};

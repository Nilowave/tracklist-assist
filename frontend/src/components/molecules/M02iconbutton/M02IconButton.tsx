import { ReactElement } from 'react';
import * as S from './M02IconButton.styles';
import { Icon } from '../../atoms/A01Icon/icons';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';

interface M02iconbuttonProps {
  icon: Icon;
  tooltip?: string;
  text?: string;
  onClick?: () => void;
}

export const M02iconbutton = ({ icon, tooltip, text, onClick }: M02iconbuttonProps): ReactElement => {
  return (
    <S.StyledM02IconButton onClick={onClick} $isText={!!text}>
      <S.IconWrapper $isText={!!text}>
        <A01Icon name={icon} size={19} />
        {tooltip && !text && <S.Tooltip>{tooltip}</S.Tooltip>}
      </S.IconWrapper>
      {text && <S.Text>{text}</S.Text>}
    </S.StyledM02IconButton>
  );
};

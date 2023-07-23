import { ReactElement } from 'react';
import * as S from './M01PrimaryButton.styles';
import { Icon } from '../../atoms/A01Icon/icons';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';

interface M01PrimaryButtonProps {
  text: string;
  icon?: Icon;
  onClick?: () => void;
}

export const M01PrimaryButton = ({ text, icon, onClick }: M01PrimaryButtonProps): ReactElement => {
  return (
    <S.StyledM01PrimaryButton onClick={onClick} hasIcon={!!icon}>
      <S.Text>{text}</S.Text>
      {icon && <A01Icon name={icon} />}
    </S.StyledM01PrimaryButton>
  );
};

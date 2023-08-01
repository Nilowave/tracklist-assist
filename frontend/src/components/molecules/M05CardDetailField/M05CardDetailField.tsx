import { ReactElement } from 'react';
import * as S from './M05CardDetailField.styles';
import { Text } from '../../atoms/A03Text/A03Text.styles';

interface M05CardDetailFieldProps {
  title: string;
  detail: string;
}

export const M05CardDetailField = ({ title, detail }: M05CardDetailFieldProps): ReactElement => {
  return (
    <S.StyledM05CardDetailField>
      <Text type="caption" as="span">
        {title}
      </Text>
      <Text type="body">{detail}</Text>
    </S.StyledM05CardDetailField>
  );
};

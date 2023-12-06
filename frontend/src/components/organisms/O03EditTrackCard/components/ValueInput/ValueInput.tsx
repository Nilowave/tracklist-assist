import { ReactElement } from 'react';
import * as S from './ValueInput.styles';
import { EditIcon, SectionTitle } from '../../O03EditTrackCard.styles';
import { UseFormRegister } from 'react-hook-form';

type FormInputs = {
  date: number;
  notes?: string;
  value?: number;
};

interface ValueInputProps {
  register: UseFormRegister<FormInputs>;
  value?: number;
}

export const ValueInput = ({ register, value }: ValueInputProps): ReactElement => {
  return (
    <S.StyledValueInput $gap="0.5rem">
      <SectionTitle>Value</SectionTitle>
      <S.InputWrapper $row $align="center">
        <S.TypeWrapper>
          <S.TypeField type="button">#</S.TypeField>
        </S.TypeWrapper>
        <S.FieldWrapper>
          <S.FieldInput as="input" step="0.01" type="number" {...register('value')} defaultValue={value}></S.FieldInput>
          <EditIcon name="edit" size={19} />
        </S.FieldWrapper>
      </S.InputWrapper>
    </S.StyledValueInput>
  );
};

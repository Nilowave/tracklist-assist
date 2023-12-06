import { format } from 'date-fns';
import { ChangeEvent, ReactElement, ReactNode } from 'react';
import * as S from './A05DatePicker.styles';

interface A05DatePickerProps {
  children: ReactNode;
  className?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  defaultDate?: string | number;
}

export const A05DatePicker = ({ defaultDate, className, children, onChange }: A05DatePickerProps): ReactElement => {
  const date = format(new Date(defaultDate || ''), 'yyyy-MM-dd HH:mm:ss').replace(' ', 'T');

  return (
    <S.StyledA05DatePicker className={className}>
      <S.DateToggle>{children}</S.DateToggle>
      <S.DateInput type="datetime-local" onChange={onChange} defaultValue={date} />
    </S.StyledA05DatePicker>
  );
};

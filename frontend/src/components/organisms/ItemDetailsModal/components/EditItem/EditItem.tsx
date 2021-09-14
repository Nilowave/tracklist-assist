import { ReactElement } from 'react';
import { ItemData } from '../../../Item/Item';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Detail, Menu, SubTitle } from '../../ItemDetailsModal.styles';
import { formatISO9075 } from 'date-fns/esm';
import * as S from './EditItem.styles';
import { Button } from '../../../../atoms/Button/Button';
import { useDeviceState } from '../../../../../hooks/useDeviceState';

interface EditItemProps {
  data: ItemData;
  onCancel: () => void;
  register: UseFormRegister<FieldValues>;
}
export const EditItem = ({ data, register }: EditItemProps): ReactElement => {
  const { isMobile } = useDeviceState();

  return (
    <>
      <S.StyledForm>
        <Detail>
          <SubTitle>Name:</SubTitle>
          <S.StyledInput autoComplete="off" {...register(`name`, { required: true })} defaultValue={data.name} />
        </Detail>
        <Detail align="flex-start">
          <SubTitle>Track History:</SubTitle>
          <S.Dates>
            {data.tracks?.map((date, index) => {
              const localDate = formatISO9075(new Date(date)).replace(' ', 'T');
              console.log(localDate);

              return (
                <S.InputWrapper index={index + 1} key={`date-input-${index}`}>
                  <S.StyledDateInput {...register(`date-${index}`, { required: true })} type="datetime-local" defaultValue={localDate} />
                  <Button size="small" icon="Delete" />
                </S.InputWrapper>
              );
            })}
          </S.Dates>
        </Detail>
      </S.StyledForm>
      <Menu>
        <span />
        <Button label={isMobile ? '' : 'Add'} icon="Plus" color="comment" />
      </Menu>
    </>
  );
};

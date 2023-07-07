import { ReactElement, useRef, useState } from 'react';
import { ItemData } from '../../../Item/Item';
import { UseFormReturn } from 'react-hook-form';
import { Detail, Menu, SubTitle } from '../../ItemDetailsModal.styles';
// import { formatISO9075 } from 'date-fns/esm';
import * as S from './EditItem.styles';
import { Button } from '../../../../atoms/Button/Button';
import { useDeviceState } from '../../../../../hooks/useDeviceState';
import { Error } from '../../../ItemInput/ItemInput.styles';
import { toDatetimeLocal } from '../../../../../utils/toDatetimeLocal';

interface EditItemProps {
  data: ItemData;
  onCancel: () => void;
  formMethods: UseFormReturn;
}
export const EditItem = ({ data, formMethods }: EditItemProps): ReactElement => {
  const { isMobile } = useDeviceState();

  const tracksData = useRef<Array<number>>([...data.tracks]);
  const [tracks, setTracks] = useState([...data.tracks]);
  const watchFormName = formMethods.watch('name');

  const handleDeleteItem = (index: number) => {
    tracksData.current.splice(index, 1);
    setTracks([...tracksData.current]);
    formMethods.reset({ name: watchFormName });
  };

  const handleAddItem = () => {
    tracksData.current.push(Date.now());

    formMethods.reset({ name: watchFormName });
    setTracks([...tracksData.current]);
  };

  return (
    <>
      <S.StyledForm>
        <Detail layout>
          <SubTitle>Name: {formMethods.formState.errors.name && <Error>⬐ This is requiered</Error>}</SubTitle>
          <S.StyledInput autoComplete="off" {...formMethods.register(`name`, { required: true })} defaultValue={data.name} />
        </Detail>
        <Detail align="flex-start">
          <S.HistoryTitle layout>Track History:</S.HistoryTitle>
          <S.Dates layout>
            {tracks.map((date, index) => {
              // const localDate = formatISO9075(new Date(date)).replace(' ', 'T');
              const localDate = toDatetimeLocal(new Date(date));
              let prevDate;
              if (index > 0) {
                // prevDate = formatISO9075(new Date(tracks[index - 1])).replace(' ', 'T');
                prevDate = toDatetimeLocal(new Date(tracks[index - 1]));
              }

              return (
                <S.InputWrapper layout key={`date-input-${index}`}>
                  <Button type="button" onClick={() => handleDeleteItem(index)} size="small" icon="Delete" />
                  <S.StyledDateInput
                    {...formMethods.register(`tracks.date-${index}`, { required: true })}
                    type="datetime-local"
                    step="0.1"
                    defaultValue={localDate}
                    {...(prevDate && { min: prevDate })}
                  />
                  <S.StyledNumber>{index + 1}</S.StyledNumber>
                </S.InputWrapper>
              );
            })}
          </S.Dates>
        </Detail>
      </S.StyledForm>
      <Menu>
        <span />
        <Button type="button" onClick={handleAddItem} label={isMobile ? '' : 'Add'} icon="Plus" color="blueGray" />
      </Menu>
    </>
  );
};

import { formatDistance } from 'date-fns';
import { ReactElement, useMemo, useState } from 'react';
import * as S from './O02TrackCard.styles';
import { cardDateFormat } from './utils/cardDateFormat';
import { DBTrackData } from '../../../api/api.types';
import { A01Icon } from '../../atoms/A01Icon/A01Icon';
import { Text } from '../../atoms/A03Text/A03Text.styles';

interface O02TrackCardProps {
  data: DBTrackData;
  previousDate?: number;
  number: number;
}

export const O02TrackCard = ({ data, number, previousDate }: O02TrackCardProps): ReactElement => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const date = new Date(data.date);

  const formattedDate = cardDateFormat(data.date);

  const delta = useMemo(() => previousDate && formatDistance(new Date(previousDate), date, { addSuffix: false }), [previousDate]);

  const openEdit = () => {
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
  };

  return (
    <S.StyledO02TrackCard $isEditing={isEditing}>
      <S.CardButton onClick={openEdit}>
        <S.Number>{number}</S.Number>
        <div>
          <S.DateGrid>
            <S.Date>{formattedDate.day}</S.Date>
            <S.Month>{formattedDate.month}</S.Month>
            <S.Year>{formattedDate.year}</S.Year>
          </S.DateGrid>
          <S.Time>{formattedDate.time}</S.Time>
        </div>
        {(data.notes || data.value) && (
          <S.NotesWrapper $gap="0.8rem">
            {data.notes && <S.NotesText $type="bodySmall">{data.notes}</S.NotesText>}
            {data.value && <Text $type="tinyTitle">{data.value}</Text>}
          </S.NotesWrapper>
        )}
        {delta && (
          <S.Delta $row $align="center" $gap="0.8rem">
            <A01Icon name="rewind" size={10} />
            {delta}
          </S.Delta>
        )}
      </S.CardButton>
      {isEditing && <S.EditTrackCard number={number} date={formattedDate} data={data} onClose={closeEdit} />}
    </S.StyledO02TrackCard>
  );
};

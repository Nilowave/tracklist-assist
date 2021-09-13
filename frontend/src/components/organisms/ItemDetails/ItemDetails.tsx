import { ReactElement, useEffect, useState } from 'react';
import * as S from './ItemDetails.styles';
import { ItemData } from '../Item/Item';
import { formatDistance, formatRelative, intervalToDuration, formatDuration, add } from 'date-fns';
import { limitDuration } from '../../../utils/limitDuration';
import { Button } from '../../atoms/Button/Button';
import { Modal } from '../Modal/Modal';

interface ItemDetailsProps {
  onClose: () => void;
  onDelete: (id: string) => void;
  data: ItemData;
}

export const ItemDetails = ({ onClose, data, onDelete }: ItemDetailsProps): ReactElement => {
  const [averageDuration, setAverageDuration] = useState<string | null>(null);

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${data.name}"`)) {
      data._id && onDelete(data._id);
      onClose();
    }
  };

  const date = new Date(data.tracks?.slice(-1)[0] || '');
  const distance = formatDistance(date || new Date(), new Date(), { addSuffix: true });

  useEffect(() => {
    if (data.tracks && data.tracks.length > 1) {
      let average = 0;
      data.tracks.forEach((d, index) => {
        if (data.tracks && data.tracks[index + 1]) {
          const next = data.tracks[index + 1];
          const interval = intervalToDuration({
            start: new Date(d),
            end: new Date(next),
          });
          const diff = +add(0, interval);

          average += diff;
        }
      });

      average = average / (data.tracks.length - 1);
      const durationAverage = intervalToDuration({
        start: 0,
        end: average,
      });

      setAverageDuration(formatDuration(limitDuration(durationAverage)));
    }
  }, []);

  return (
    <Modal onClose={onClose}>
      <S.Content>
        <S.Title>{data.name}</S.Title>
        <S.Card>
          <S.Detail>
            <S.SubTitle>Last tracked:</S.SubTitle>
            <S.StyledDate>{distance}</S.StyledDate>
          </S.Detail>
          {averageDuration && (
            <S.Detail>
              <S.SubTitle>Average Track:</S.SubTitle>
              <S.StyledDate variant>{averageDuration}</S.StyledDate>
            </S.Detail>
          )}
          <S.Detail align="flex-start">
            <S.SubTitle>History:</S.SubTitle>
            <S.StyledHistory>
              {data.tracks &&
                data.tracks.map((d, index) => {
                  const date = formatRelative(new Date(d), new Date());
                  let diff;
                  if (data.tracks && data.tracks[index + 1]) {
                    const next = data.tracks[index + 1];
                    const interval = intervalToDuration({
                      start: new Date(d),
                      end: new Date(next),
                    });
                    diff = formatDuration(limitDuration(interval));
                  }
                  return (
                    <div key={`history-date-${index}`}>
                      <S.HistoryDate index={index + 1}>{date}</S.HistoryDate>
                      {diff && <S.Diff>{diff}</S.Diff>}
                    </div>
                  );
                })}
            </S.StyledHistory>
          </S.Detail>
        </S.Card>
        <S.Menu>
          <Button color="red" icon="Delete" onClick={handleDelete} label="Delete" />
          <Button color="yellow" disable icon="Edit" onClick={() => console.log('edit')} label="Edit" />
        </S.Menu>
      </S.Content>
    </Modal>
  );
};

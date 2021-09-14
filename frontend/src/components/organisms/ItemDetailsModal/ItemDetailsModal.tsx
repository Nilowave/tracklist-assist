import { ReactElement, useEffect, useState } from 'react';
import * as S from './ItemDetailsModal.styles';
import { ItemData } from '../Item/Item';
import { formatDistance, intervalToDuration, formatDuration, add } from 'date-fns';
import { limitDuration } from '../../../utils/limitDuration';
import { Button } from '../../atoms/Button/Button';
import { Modal } from '../Modal/Modal';
import { ItemDetails } from './components/ItemDetails/ItemDetails';
import { EditItem } from './components/EditItem/EditItem';
import { FieldValues, useForm } from 'react-hook-form';

interface ItemDetailsModalProps {
  onClose: () => void;
  onDelete: (id: string) => void;
  data: ItemData;
}

export const ItemDetailsModal = ({ onClose, data, onDelete }: ItemDetailsModalProps): ReactElement => {
  const [averageDuration, setAverageDuration] = useState<string | null>(null);
  const [editItem, setEditItem] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const handleEditSubmit = (data: FieldValues) => {
    console.log('edits', data);
    // onClose();
    setEditItem(false);
  };

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
        {!editItem && <S.Title>{data.name}</S.Title>}
        <S.Card layout>
          {editItem ? (
            <EditItem register={register} onCancel={() => setEditItem(false)} data={data} />
          ) : (
            <ItemDetails data={data} averageDuration={averageDuration} distance={distance} />
          )}
        </S.Card>
        <S.Menu>
          {editItem ? (
            <>
              <Button textColor="cream" color="selection" icon="Close" onClick={() => setEditItem(false)} label="Cancel" />
              <Button color="primary" icon="Delete" onClick={handleSubmit(handleEditSubmit)} label="Save" />
            </>
          ) : (
            <>
              <Button color="red" icon="Delete" onClick={handleDelete} label="Delete" />
              <Button color="yellow" icon="Edit" onClick={() => setEditItem(true)} label="Edit" />
            </>
          )}
        </S.Menu>
      </S.Content>
    </Modal>
  );
};

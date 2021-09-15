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
import axios from 'axios';

interface ItemDetailsModalProps {
  onClose: () => void;
  onDelete: (id: string) => void;
  data: ItemData;
}

export const ItemDetailsModal = ({ onClose, data, onDelete }: ItemDetailsModalProps): ReactElement => {
  const [averageDuration, setAverageDuration] = useState<string | null>(null);
  const [editItem, setEditItem] = useState(false);

  const formMethods = useForm();

  const handleEditSubmit = (formData: FieldValues) => {
    const submitData: ItemData = {
      name: formData.name,
      tracks: Object.values(formData.tracks),
      _id: data._id,
    };

    if (data._id) {
      axios
        .put(`/api/item/${data._id}`, submitData)
        .then(() => {
          console.log('update success yayyyyy');
        })
        .catch((error) => {
          console.log('oops', error);
        });
    }

    onClose();
    setEditItem(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${data.name}"`)) {
      data._id && onDelete(data._id);
      onClose();
    }
  };

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
            <EditItem formMethods={formMethods} onCancel={() => setEditItem(false)} data={data} />
          ) : (
            <ItemDetails data={data} averageDuration={averageDuration} />
          )}
        </S.Card>
        <S.Menu>
          {editItem ? (
            <>
              <Button textColor="cream" color="selection" icon="Back" onClick={() => setEditItem(false)} label="Cancel" />
              <Button color="primary" icon="Save" onClick={formMethods.handleSubmit(handleEditSubmit)} label="Save" />
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

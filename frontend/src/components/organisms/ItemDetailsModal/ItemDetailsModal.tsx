import { ReactElement, useState } from 'react';
import * as S from './ItemDetailsModal.styles';
import { ItemData } from '../Item/Item';
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
  const [editItem, setEditItem] = useState(false);

  const formMethods = useForm();

  const handleEditSubmit = (formData: FieldValues) => {
    console.log('handleEditSubmit');

    console.log(formData.tracks);

    const dates = (Object.values(formData.tracks) as Array<string>).map((date: string) => new Date(date).getTime());
    console.log({ dates });

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
    if (confirm(`Sure you want to delete "${data.name}"?`)) {
      data._id && onDelete(data._id);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <S.Content>
        {!editItem && <S.Title>{data.name}</S.Title>}
        <S.Card layout>
          {editItem ? <EditItem formMethods={formMethods} onCancel={() => setEditItem(false)} data={data} /> : <ItemDetails data={data} />}
        </S.Card>
        <S.Menu>
          {editItem ? (
            <>
              <Button textColor="foreground" color="outerSpace" icon="Back" onClick={() => setEditItem(false)} label="Cancel" />
              <Button color="primary" icon="Save" onClick={formMethods.handleSubmit(handleEditSubmit)} label="Save" />
            </>
          ) : (
            <>
              <Button color="red" icon="Delete" onClick={handleDelete} label="Delete" />
              <Button color="keyLime" icon="Edit" onClick={() => setEditItem(true)} label="Edit" />
            </>
          )}
        </S.Menu>
      </S.Content>
    </Modal>
  );
};

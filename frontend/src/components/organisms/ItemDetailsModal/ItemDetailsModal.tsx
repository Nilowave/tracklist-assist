import { ReactElement, useState } from 'react';
import * as S from './ItemDetailsModal.styles';
import { CardData } from '../O01DashboardCard/O01DashboardCard';
import { Modal } from '../Modal/Modal';
import { ItemDetails } from './components/ItemDetails/ItemDetails';
import { EditItem } from './components/EditItem/EditItem';
import { FieldValues, useForm } from 'react-hook-form';
import axios from 'axios';
import { Flex } from '../../../styles/ui';
import { useDeviceState } from '../../../hooks/useDeviceState';
import { M01PrimaryButton } from '../../molecules/M01PrimaryButton/M01PrimaryButton';

interface ItemDetailsModalProps {
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate?: (data: CardData) => void;
  data: CardData;
}

type FormData = {
  tracks: Array<string>;
  name: string;
};

export const ItemDetailsModal = ({ onClose, data, onDelete, onUpdate }: ItemDetailsModalProps): ReactElement => {
  const [editItem, setEditItem] = useState(false);

  const formMethods = useForm();

  const { isMobile } = useDeviceState();

  const handleEditSubmit = (formData: FieldValues) => {
    const fields = formData as FormData;

    const tracks: Array<number> = Object.values(fields.tracks).map((date: string) => new Date(date).getTime());

    const submitData: CardData = {
      name: fields.name,
      tracks,
      _id: data._id,
    };

    if (data._id) {
      axios
        .put(`/api/item/${data._id}`, submitData)
        .then(() => {
          console.log(':)');
        })
        .catch((error) => {
          console.log(':(', error);
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

  const handleTrackNew = () => {
    const newDate = Date.now();
    const { tracks } = data;

    const update = [...tracks, newDate];
    const submitData: CardData = {
      name: data.name,
      tracks: update,
      _id: data._id,
    };

    if (data._id) {
      axios.put(`/api/item/${data._id}`, submitData).then(() => {
        if (onUpdate) {
          const updatedData: CardData = {
            ...data,
            ...submitData,
          };
          onUpdate(updatedData);
        }

        axios.get(`/api/item/${data._id}`).then((_data) => {
          if (onUpdate) {
            onUpdate(_data.data.data as CardData);
          }
        });
      });
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
              <M01PrimaryButton
                textColor="foreground"
                color="outerSpace"
                icon="backArrow"
                onClick={() => setEditItem(false)}
                text="Cancel"
              />
              <M01PrimaryButton color="primary" onClick={formMethods.handleSubmit(handleEditSubmit)} text="Save" />
            </>
          ) : (
            <>
              <M01PrimaryButton color="red" onClick={handleDelete} text="Delete" />
              <Flex $row $gap="3rem">
                <M01PrimaryButton color="keyLime" onClick={() => setEditItem(true)} text="Edit" />
                {!isMobile && <M01PrimaryButton color="primary" icon="add" onClick={handleTrackNew} text="Track" />}
              </Flex>
            </>
          )}
        </S.Menu>
      </S.Content>
    </Modal>
  );
};

import { ReactElement, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { EditItem } from './components/EditItem/EditItem';
import { ItemDetails } from './components/ItemDetails/ItemDetails';
import * as S from './ItemDetailsModal.styles';
import { trackNewItem, updateItem } from '../../../store/api';
import { Flex } from '../../../styles/ui';
import { M01PrimaryButton } from '../../molecules/M01PrimaryButton/M01PrimaryButton';
import { Modal } from '../Modal/Modal';
import { CardData } from '../O01DashboardCard/O01DashboardCard';

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

  const handleEditSubmit = (formData: FieldValues) => {
    const fields = formData as FormData;

    const tracks: Array<number> = Object.values(fields.tracks).map((date: string) => new Date(date).getTime());

    const submitData: CardData = {
      name: fields.name,
      tracks,
      _id: data._id,
    };

    if (data._id) {
      updateItem(submitData);
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
    if (data._id) {
      trackNewItem(data).then((updateData) => {
        if (onUpdate) {
          updateData && onUpdate(updateData);
        }
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
              <Flex $row $gap="1.5rem">
                <M01PrimaryButton color="keyLime" onClick={() => setEditItem(true)} text="Edit" />
                <M01PrimaryButton color="primary" icon="add" onClick={handleTrackNew} text="Track" />
              </Flex>
            </>
          )}
        </S.Menu>
      </S.Content>
    </Modal>
  );
};

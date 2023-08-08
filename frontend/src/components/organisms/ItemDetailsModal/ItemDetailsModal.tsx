import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as S from './ItemDetailsModal.styles';
import { DBCardData } from '../../../api/api.types';
import { trackNewItem } from '../../../api/cards';
import { Flex } from '../../../styles/ui';
import { M01PrimaryButton } from '../../molecules/M01PrimaryButton/M01PrimaryButton';
import { Modal } from '../Modal/Modal';

interface ItemDetailsModalProps {
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate?: (data: DBCardData) => void;
  data: DBCardData;
}

// type FormData = {
//   tracks: Array<string>;
//   name: string;
// };

export const ItemDetailsModal = ({ onClose, data, onDelete, onUpdate }: ItemDetailsModalProps): ReactElement => {
  const [editItem, setEditItem] = useState(false);

  const formMethods = useForm();

  const handleEditSubmit = () => {
    // const tracks: Array<number> = Object.values(fields.tracks).map((date: string) => new Date(date).getTime());

    // const submitData: DBCardData = {
    //   name: fields.name,
    //   // tracks,
    //   id: data.id,
    // };

    if (data.id) {
      // apiUpdateCard(submitData);
    }

    onClose();
    setEditItem(false);
  };

  const handleDelete = () => {
    if (confirm(`Sure you want to delete "${data.name}"?`)) {
      data.id && onDelete(data.id);
      onClose();
    }
  };

  const handleTrackNew = () => {
    if (data.id) {
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

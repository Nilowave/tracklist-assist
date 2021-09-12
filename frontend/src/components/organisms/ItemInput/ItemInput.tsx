import type { ReactElement } from 'react';
import { AddButton } from '../AddButton/AddButton';
import { FieldValues, useForm } from 'react-hook-form';
import * as S from './ItemInput.styles';
import { CloseButton } from '../CloseButton/CloseButton';
import { ItemData } from '../Item/Item';
import { Modal } from '../ItemDetails/ItemDetails.styles';

interface ItemInputProps {
  onClose: () => void;
  submit: (item: ItemData) => void;
}

export const ItemInput = ({ onClose, submit }: ItemInputProps): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    const item: ItemData = {
      name: data.name,
    };

    submit(item);
    onClose();

    console.log(item);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.Title>Track what?</S.Title>
        <S.Input autoFocus {...register('name', { required: true })} placeholder="Describe item here..." />
        {errors.name && <span>This field is required</span>}
        <AddButton label="Track" />
      </form>
      <CloseButton onClick={onClose} />
    </Modal>
  );
};

import type { ReactElement } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as S from './ItemInput.styles';
import { ItemData } from '../Item/Item';
import { Modal } from '../Modal/Modal';
import { Content } from '../ItemDetails/ItemDetails.styles';
import { Button } from '../../atoms/Button/Button';

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
    <Modal onClose={onClose}>
      <Content>
        <S.StyledForm onSubmit={handleSubmit(onSubmit)}>
          <S.Wrapper>
            <S.Title>Track what?</S.Title>
            <S.Input autoFocus {...register('name', { required: true })} placeholder="Describe item here..." />
            {errors.name && <S.Error>❌ This field is required</S.Error>}
          </S.Wrapper>
          <div>
            <Button label="Track" icon="Plus" color="primary" />
          </div>
        </S.StyledForm>
      </Content>
    </Modal>
  );
};

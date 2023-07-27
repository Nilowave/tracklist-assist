import type { ReactElement } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as S from './ItemInput.styles';
import { CardData } from '../O01DashboardCard/O01DashboardCard';
import { Modal } from '../Modal/Modal';
import { Content } from '../ItemDetailsModal/ItemDetailsModal.styles';
import { M01PrimaryButton } from '../../molecules/M01PrimaryButton/M01PrimaryButton';

interface ItemInputProps {
  onClose: () => void;
  submit: (item: CardData) => void;
}

export const ItemInput = ({ onClose, submit }: ItemInputProps): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    const item: CardData = {
      name: data.name,
      tracks: [Date.now()],
    };

    submit(item);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Content>
        <S.StyledForm onSubmit={handleSubmit(onSubmit)}>
          <S.Wrapper>
            <S.Title>Track what?</S.Title>
            <S.Input
              maxLength={20}
              autoComplete="off"
              autoFocus
              {...register('name', { required: true })}
              placeholder="Describe item here..."
            />
            {errors.name && <S.Error>This field is required</S.Error>}
          </S.Wrapper>
          <div>
            <M01PrimaryButton text="Track" icon="addLarge" color="primary" />
          </div>
        </S.StyledForm>
      </Content>
    </Modal>
  );
};

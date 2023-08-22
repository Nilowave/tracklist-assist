import { ChangeEvent, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DateGrid, Date as DateWrapper, Month, Time, Year } from '../O02TrackCard/O02TrackCard.styles';
import { DBTrackData } from '../../../api/api.types';
import { useTrackStore } from '../../../api/tracks';
import 'react-datepicker/dist/react-datepicker.css';
import * as S from './O03EditTrackCard.styles';
import { Flex } from '../../../styles/ui';
import { cardDateFormat, DateFormat } from '../O02TrackCard/utils/cardDateFormat';
import { A05DatePicker } from '../../atoms/A05DatePicker/A05DatePicker';
import { Button } from '@mui/material';
import { useDialog } from '../../../hooks/useDialog';
import { ValueInput } from './components/ValueInput/ValueInput';

interface O03EditTrackCardProps {
  data: DBTrackData;
  date: DateFormat;
  number: number;
  className?: string;
  onClose: () => void;
}

type FormInputs = {
  date: number;
  notes?: string;
  value?: number;
};

export const O03EditTrackCard = ({ data, number, className, onClose }: O03EditTrackCardProps): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<number | string>(data.date);

  const updateTrack = useTrackStore((state) => state.updateTrack);
  const deleteTrack = useTrackStore((state) => state.deleteTrack);

  const { showDialog, hideDialog } = useDialog();

  const { register, handleSubmit, setValue } = useForm<FormInputs>({
    defaultValues: {
      date: data.date,
    },
  });

  const { day, month, year, time } = useMemo(() => cardDateFormat(selectedDate), [selectedDate]);

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    if (!data.date) {
      return;
    }
    const updateData: DBTrackData = {
      ...data,
      ...formData,
    };

    updateTrack(updateData).then(() => {
      onCloseCard();
    });
  };

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setValue('date', date.getTime(), { shouldValidate: true });
    setSelectedDate(event.target.value);
  };

  const onCloseCard = () => {
    if (elementRef.current) enableBodyScroll(elementRef.current);
    onClose();
  };

  const onArchive = () => {
    const handleConfirm = () => {
      hideDialog();

      setTimeout(() => {
        deleteTrack(data.id);
        onCloseCard();
      }, 200);
    };

    const title = 'Archiving track';
    const content = (
      <>
        <p>
          By archiving track #, it will be temporarily hidden from views and metrics. Don&apos;t worry, you can always bring it back later
          from the settings menu.
        </p>
        <br />
        <p>
          <strong>Are you sure you want to archive this track?</strong>
        </p>
      </>
    );

    const actions = [
      <Button key="cancel" onClick={hideDialog}>
        Cancel
      </Button>,
      <Button color="muted" key="confirm" onClick={handleConfirm}>
        Confirm
      </Button>,
    ];

    showDialog(title, content, actions);
  };

  useEffect(() => {
    if (elementRef.current) {
      disableBodyScroll(elementRef.current);
    }

    return () => {
      if (elementRef.current) enableBodyScroll(elementRef.current);
      clearAllBodyScrollLocks();
    };
  }, [elementRef]);

  return (
    <S.StyledO03EditTrackCard ref={elementRef} className={className} $align="center" $justify="center">
      <S.Backdrop onClick={onCloseCard} />

      <S.Card $gap="2rem" as="form" onSubmit={handleSubmit(onSubmit)}>
        <S.Number>{number}</S.Number>
        <S.CloseButton icon="close" onClick={onCloseCard} size="medium" />
        <Flex $gap="0.5rem">
          <S.SectionTitle>Date</S.SectionTitle>
          <S.DateWrapper>
            <A05DatePicker defaultDate={selectedDate} onChange={onDateChange}>
              <S.Wrapper>
                <DateGrid>
                  <DateWrapper>{day}</DateWrapper>
                  <Month>{month}</Month>
                  <Year>{year}</Year>
                </DateGrid>
                <Time>{time}</Time>
                <S.EditIcon name="edit" size={19} $right="0" $bottom="0" $top="auto" />
              </S.Wrapper>
            </A05DatePicker>
          </S.DateWrapper>
        </Flex>

        <Flex $gap="0.5rem">
          <S.SectionTitle>Note</S.SectionTitle>
          <S.Wrapper>
            <S.Input
              contentEditable
              onInput={(event) => {
                setValue('notes', event.currentTarget.textContent ?? undefined, { shouldValidate: true });
              }}
              dangerouslySetInnerHTML={{ __html: data.notes || '' }}
            ></S.Input>
            <S.EditIcon name="edit" size={19} />
          </S.Wrapper>
        </Flex>

        <ValueInput value={data.value} register={register} />

        <S.ButtonWrapper $justify="space-between" $row>
          <S.SaveButton text="Save" color="tertiary" size="medium" />
          <S.ArchiveButton type="button" onClick={onArchive}>
            Archive
          </S.ArchiveButton>
        </S.ButtonWrapper>
      </S.Card>
    </S.StyledO03EditTrackCard>
  );
};

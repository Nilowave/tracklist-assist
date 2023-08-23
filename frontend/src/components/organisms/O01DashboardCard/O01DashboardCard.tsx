import { Button } from '@mui/material';
import { format, formatDistance, formatDuration } from 'date-fns';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { type ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { expandedAtom } from './O01DashboardCard.atoms';
import * as S from './O01DashboardCard.styles';
import { DBCardData } from '../../../api/api.types';
import { useCardStore } from '../../../api/cards';
import { TrackReturnData, useTrackStore } from '../../../api/tracks';
import { Cards } from '../../../data/enum/Cards';
import { Path } from '../../../data/enum/Path';
import { useDialog } from '../../../hooks/useDialog';
import useIsMounted from '../../../hooks/useIsMounted';
import { cardsAtom, shouldFetchAtom } from '../../../pages/Dashboard/Dashboard.atoms';
import { limitDuration } from '../../../utils/limitDuration';
import { slideFade } from '../../../utils/motionTransitions';
import { A02Counter } from '../../atoms/A02Counter/A02Counter';
import { A04Tooltip } from '../../atoms/A04Tooltip/A04Tooltip';
import { M02IconButton } from '../../molecules/M02IconButton/M02IconButton';
import { M05CardDetailField } from '../../molecules/M05CardDetailField/M05CardDetailField';

interface O01DashboardCardProps {
  data: DBCardData;
  isNew?: boolean;
}

export const O01DashboardCard = ({ data, isNew }: O01DashboardCardProps): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLTextAreaElement>(null);

  const updateCard = useCardStore((state) => state.updateCard);
  const deleteCard = useCardStore((state) => state.deleteCard);
  const createNewCard = useCardStore((state) => state.createNewCard);
  const createNewTrack = useTrackStore((state) => state.createNewTrack);

  const [, setShouldFetchCards] = useAtom(shouldFetchAtom);
  const [cards, setCards] = useAtom(cardsAtom);
  const [expandedId, setExpandedId] = useAtom(expandedAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(isNew || false);
  const [cardData, setCardData] = useState<DBCardData>(data);

  const { showDialog, hideDialog } = useDialog();

  const isMounted = useIsMounted();
  const lastTrack = useMemo(() => cardData.last && formatDistance(new Date(cardData.last), new Date(), { addSuffix: true }), [cardData]);
  const isExpanded = useMemo(() => expandedId === cardData.id, [expandedId, cardData.id]);

  const textFitOptions = { multiLine: true, minFontSize: 16, maxFontSize: 32, maxLength: 35 };

  const onCardClick = useCallback(() => {
    if (isEditing) return;
  }, [isEditing]);

  const onExpandClick = useCallback(() => {
    if (expandedId === cardData.id) {
      setExpandedId(RESET);
    } else {
      setExpandedId(cardData.id || RESET);
    }
  }, [expandedId]);

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onArchiveClick = () => {
    const handleConfirm = () => {
      const update: DBCardData = {
        ...data,
        archived: true,
      };
      updateCard(update).then(() => {
        setShouldFetchCards(true);
        hideDialog();
      });
    };

    const title = 'Archiving card';
    const content = (
      <>
        <p>
          By archiving the card <strong className="uc">&quot;{data.name}&quot;</strong>, it will be temporarily hidden from views and
          metrics. Don&apos;t worry, you can always bring it back later from the settings menu.
        </p>
        <br />
        <p>
          <strong>Are you sure you want to archive this card?</strong>
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

  const onDeleteClick = () => {
    const handleConfirm = () => {
      const { request } = deleteCard(data.id);
      request.then(() => {
        setShouldFetchCards(true);
        hideDialog();
      });
    };

    const title = (
      <>
        Deleting <span className="uc">&apos;{data.name}&apos;</span>
      </>
    );
    const content = (
      <>
        <p>This card contains {data.count} track date(s). Deleting it will remove all associated data.</p>
        <br />
        <p>
          <strong>Are you sure you want to delete this card?</strong>
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

  const onQuickAddCallback = (update: TrackReturnData) => {
    const updateCount: DBCardData = {
      ...cardData,
      count: update.count,
      last: update.track.date,
    };
    setCardData(updateCount);
    setShouldFetchCards(true);

    const title = 'Tracked Date!';
    const content = (
      <>
        <p>
          A new Tracked date was added to <strong className="uc">&quot;{data.name}&quot;</strong>
        </p>
        <br />
        <p>
          <strong>{format(new Date(update.track.date), 'LLLL do, yyyy  hh:mm b')}</strong>
        </p>
      </>
    );

    const actions = [
      <Button color="primary" key="confirm" onClick={hideDialog}>
        Thanks!
      </Button>,
    ];
    showDialog(title, content, actions);
  };

  const onQuickAddClick = () => {
    setIsLoading(true);
    createNewTrack(cardData.id)
      .then(onQuickAddCallback)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onChangeName = useCallback(() => {
    if (nameInputRef.current) {
      const { value: name } = nameInputRef.current;
      const validName = name.trim(); // TODO: better validation

      if (!validName) {
        setIsLoading(false);
        onCancelChange();
        return;
      }

      const update = {
        ...data,
        name: name.trim(),
      };

      setIsLoading(true);

      (cardData.id === Cards.NEW ? createNewCard({ name, id: '' }) : updateCard(update))
        .then((update) => {
          if (update) {
            setShouldFetchCards(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
          onCancelChange();
        });
    }
  }, [nameInputRef]);

  const onCancelChange = () => {
    setIsEditing(false);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key == 'Enter') {
      onChangeName();
    }

    if (event.key == 'Escape') {
      onCancelChange();
    }
  };

  const onClickOutside = (event: MouseEvent | TouchEvent) => {
    if (elementRef.current && event.target instanceof Node) {
      const { target } = event;
      if (!elementRef.current.contains(target)) {
        onCancelChange();
      }
    }
  };

  useEffect(() => {
    if (!isEditing && !cardData.name && cardData.id === Cards.NEW && isMounted) {
      const updateCards = cards.filter((item) => item.id !== Cards.NEW);
      setCards(updateCards);
    }
  }, [isEditing, cardData, isMounted]);

  useEffect(() => {
    if (data.id === Cards.NEW) {
      setIsEditing(true);
    }
  }, [data]);

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mouseup', onClickOutside);
      document.addEventListener('touchend', onClickOutside);
    } else {
      document.removeEventListener('mouseup', onClickOutside);
      document.removeEventListener('touchend', onClickOutside);
    }

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [isEditing]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <S.O01DashboardCard
      ref={elementRef}
      layout={true}
      transition={{ layout: { duration: 0.5, ease: 'easeInOut' } }}
      variants={{ ...slideFade('y', 0.7).variants }}
    >
      <S.CardButton
        to={Path.Tracker}
        state={{ id: data.id, card: data }}
        onClick={onCardClick}
        $isExpanded={isExpanded}
        $isEditing={isEditing}
      >
        <S.Content $justify="center" $align="center" $gap="1.8rem" $isExpanded={isExpanded}>
          <S.TitleWrapper $isExpanded={isExpanded} $isEditing={isEditing}>
            <S.TitleMotion layout="position" transition={{ layout: { duration: 0.5, ease: 'backInOut' } }}>
              <S.Title
                type="h2"
                fit={textFitOptions}
                isInput={isEditing}
                defaultValue={cardData.name}
                placeholder={cardData.name || 'Card title'}
                inputProps={{ rows: 2, cols: 9, maxLength: 28 }}
                ref={nameInputRef}
              >
                {cardData.name}
              </S.Title>
            </S.TitleMotion>
            {!isExpanded && lastTrack && <S.Date $isEditing={isEditing}>{lastTrack}</S.Date>}
          </S.TitleWrapper>
          {isExpanded && (
            <S.DetailsWrapper $gap="2rem" $align="flex-start" $justify="flex-start">
              {lastTrack && <M05CardDetailField title="Last tracked" detail={lastTrack} />}
              {cardData.average && <M05CardDetailField title="Track average" detail={formatDuration(limitDuration(cardData.average))} />}
            </S.DetailsWrapper>
          )}
          <S.FooterWrapper $justify="flex-end" $align="center" $gap="1.5rem" $row></S.FooterWrapper>
        </S.Content>
      </S.CardButton>

      <S.InteractiveOverlay $justify="space-between" $isExpanded={isExpanded}>
        {isEditing ? (
          <S.EditWrapper $self="flex-end" $gap="5.5rem" $row $justify="space-between">
            <S.ExpandButton
              iconSize={isLoading ? 30 : 12}
              fill="transparent"
              onClick={onChangeName}
              icon={isLoading ? 'spinner' : 'check'}
              disabled={isLoading}
              tooltip={isLoading ? 'Loading...' : 'Save'}
              $persist
            />
            <S.ExpandButton
              iconSize={12}
              fill="transparent"
              onClick={onCancelChange}
              icon="close"
              disabled={isLoading}
              tooltip="Cancel"
              $persist
            />
          </S.EditWrapper>
        ) : (
          <S.MenuButton
            isExpanded={isExpanded}
            onExpand={onExpandClick}
            onEdit={onEditClick}
            onArchive={onArchiveClick}
            onDelete={onDeleteClick}
          />
        )}
        {!isEditing && (
          <A04Tooltip title="Rename" placement="top">
            <S.EditButton onClick={onEditClick}></S.EditButton>
          </A04Tooltip>
        )}

        <S.FooterWrapper $justify="flex-end" $align="center" $gap="1.5rem" $row>
          {cardData.count && <A02Counter count={cardData.count} />}
          {isExpanded && (
            <M02IconButton
              icon={isLoading ? 'spinner' : 'add'}
              disabled={isLoading}
              tooltip={isLoading ? 'Loading...' : 'Track item'}
              onClick={onQuickAddClick}
            />
          )}
        </S.FooterWrapper>
      </S.InteractiveOverlay>
    </S.O01DashboardCard>
  );
};

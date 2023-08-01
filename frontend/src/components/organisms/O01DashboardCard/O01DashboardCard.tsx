import { formatDuration } from 'date-fns';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { type ReactElement, useCallback, useMemo, useState } from 'react';
import { expandedAtom } from './O01DashboardCard.atoms';
import * as S from './O01DashboardCard.styles';
import { trackNewItem } from '../../../store/api';
import { limitDuration } from '../../../utils/limitDuration';
import { slideFade } from '../../../utils/motionTransitions';
import { A02Counter } from '../../atoms/A02Counter/A02Counter';
import { M02IconButton } from '../../molecules/M02IconButton/M02IconButton';
import { M05CardDetailField } from '../../molecules/M05CardDetailField/M05CardDetailField';
import { dialogAtom } from '../../molecules/M06Dialog/M06Dialog.atoms';

export type CardData = {
  name: string;
  tracks: Array<number>;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  lastTrack?: string;
  average?: Duration;
  intervals?: Array<Duration>;
};

interface O01DashboardCardProps {
  data: CardData;
  onClick: (id: string) => void;
}

export const O01DashboardCard = ({ data, onClick }: O01DashboardCardProps): ReactElement => {
  const [expandedId, setExpandedId] = useAtom(expandedAtom);
  const [, setDialog] = useAtom(dialogAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isExpanded = useMemo(() => expandedId === data._id, [expandedId, data._id]);
  const count = data.tracks?.length || 0;
  const textFitOptions = { multiLine: false, minFontSize: 16, maxFontSize: 32 };

  const handleClick = () => {
    data._id && onClick(data._id);
  };

  const handleExpandClick = useCallback(() => {
    if (expandedId === data._id) {
      setExpandedId(RESET);
    } else {
      setExpandedId(data._id || RESET);
    }
  }, [expandedId]);

  const onQuickAddClick = () => {
    setIsLoading(true);
    trackNewItem(data).then((updateDate) => {
      setDialog({
        open: true,
        title: 'New item tracked!',
        text: 'A new Tracked item was added in:',
        bold: updateDate?.name,
        confirm: 'Thanks!',
      });
      setIsLoading(false);
    });
  };

  return (
    <S.O01DashboardCard layout={true} variants={{ ...slideFade('y', 0.7).variants }}>
      <S.CardButton onClick={handleClick} $isExpanded={isExpanded}>
        <S.Border>
          <div />
        </S.Border>
        <S.Content $justify="center" $align="center" $gap="1.8rem" $isExpanded={isExpanded}>
          <S.TitleWrapper $isExpanded={isExpanded}>
            <motion.div layout="position">
              <S.Title type="h2" fit={textFitOptions}>
                {data.name}
              </S.Title>
            </motion.div>
            {!isExpanded && <S.Date>{data.lastTrack}</S.Date>}
          </S.TitleWrapper>
          {isExpanded && (
            <S.DetailsWrapper $gap="2rem" $align="flex-start" $justify="flex-start">
              {data.lastTrack && <M05CardDetailField title="Last tracked" detail={data.lastTrack} />}
              {data.average && <M05CardDetailField title="Track average" detail={formatDuration(limitDuration(data.average))} />}
            </S.DetailsWrapper>
          )}
          <S.FooterWrapper $justify="flex-end" $align="center" $gap="1.5rem" $row></S.FooterWrapper>
        </S.Content>
      </S.CardButton>
      <S.InteractiveOverlay $justify="space-between" $isExpanded={isExpanded}>
        <S.ExpandButton
          icon={isExpanded ? 'minimize' : 'maximize'}
          tooltip={isExpanded ? 'Minimize' : 'Expand'}
          fill="transparent"
          onClick={handleExpandClick}
        />
        <S.FooterWrapper $justify="flex-end" $align="center" $gap="1.5rem" $row>
          <A02Counter count={count} />
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

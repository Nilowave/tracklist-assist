import { ReactElement } from 'react';
import { ItemData } from '../../../Item/Item';
import { Detail, HistoryDate, StyledDate, StyledHistory, SubTitle } from '../../ItemDetailsModal.styles';
import { formatRelative, intervalToDuration, formatDuration } from 'date-fns';
import * as S from './ItemDetails.styles';
import { limitDuration } from '../../../../../utils/limitDuration';

interface ItemDetailsProps {
  data: ItemData;
  averageDuration: string | null;
}
export const ItemDetails = ({ data, averageDuration }: ItemDetailsProps): ReactElement => {
  return (
    <>
      <Detail>
        <SubTitle>Last tracked:</SubTitle>
        <StyledDate>{data.lastTrack}</StyledDate>
      </Detail>
      {averageDuration && (
        <Detail>
          <SubTitle>Average Track:</SubTitle>
          <StyledDate variant>{averageDuration}</StyledDate>
        </Detail>
      )}
      <Detail align="flex-start">
        <SubTitle>History:</SubTitle>
        <StyledHistory>
          {data.tracks &&
            data.tracks.map((d, index) => {
              const date = formatRelative(new Date(d), new Date());
              let diff;
              if (data.tracks && data.tracks[index + 1]) {
                const next = data.tracks[index + 1];
                const interval = intervalToDuration({
                  start: new Date(d),
                  end: new Date(next),
                });
                diff = formatDuration(limitDuration(interval));
              }
              return (
                <div key={`history-date-${index}`}>
                  <HistoryDate index={index + 1}>{date}</HistoryDate>
                  {diff && <S.Diff>{diff}</S.Diff>}
                </div>
              );
            })}
        </StyledHistory>
      </Detail>
    </>
  );
};

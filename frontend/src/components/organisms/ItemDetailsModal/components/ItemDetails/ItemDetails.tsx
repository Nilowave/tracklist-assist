import { ReactElement } from 'react';
import { ItemData } from '../../../Item/Item';
import { Detail, HistoryDate, StyledDate, StyledHistory, SubTitle } from '../../ItemDetailsModal.styles';
import { formatRelative, formatDuration } from 'date-fns';
import * as S from './ItemDetails.styles';
import { limitDuration } from '../../../../../utils/limitDuration';

interface ItemDetailsProps {
  data: ItemData;
}
export const ItemDetails = ({ data }: ItemDetailsProps): ReactElement => {
  let averageDuration;

  if (data.average) {
    averageDuration = formatDuration(limitDuration(data.average));
  }

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

              if (data.intervals && index < data.tracks.length - 1) {
                diff = formatDuration(limitDuration(data.intervals[index]));
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

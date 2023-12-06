import { useAtom } from 'jotai';
import { ReactElement, useEffect, useMemo } from 'react';
import * as S from './Tracker.styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../data/enum/Path';
import { useTrackStore } from '../../api/tracks';
import { O02TrackCard } from '../../components/organisms/O02TrackCard/O02TrackCard';
import { M05CardDetailField } from '../../components/molecules/M05CardDetailField/M05CardDetailField';
import { add, Duration, formatDistance, formatDistanceToNow, formatDuration, intervalToDuration } from 'date-fns';
import { limitDuration } from '../../utils/limitDuration';
import { DBCardData } from '../../api/api.types';
import { M02IconButton } from '../../components/molecules/M02IconButton/M02IconButton';
import { shouldFetchAtom } from '../Dashboard/Dashboard.atoms';

interface LocationState {
  id: string;
  card: DBCardData;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TracksProps {}

// eslint-disable-next-line no-empty-pattern
export const Tracker = ({}: TracksProps): ReactElement => {
  const tracks = useTrackStore((store) => store.tracks);
  const fetchTracks = useTrackStore((store) => store.fetchTracks);
  const createNewTrack = useTrackStore((store) => store.createNewTrack);
  const [, setShouldFetchCards] = useAtom(shouldFetchAtom);

  const location = useLocation();
  const navigate = useNavigate();
  const id = (location.state as LocationState)?.id;
  const card = (location.state as LocationState)?.card;

  const metrics = useMemo(
    () =>
      tracks.length > 0 && {
        lifespan: formatDistance(tracks[0].date, tracks[tracks.length - 1].date),
        lastTracked: formatDistanceToNow(tracks[tracks.length - 1].date, { addSuffix: true }),
        trackAverage: (() => {
          let average: number | Duration = 0;
          tracks.forEach((track, index) => {
            if (tracks[index + 1]) {
              const next = tracks[index + 1].date;
              const interval = intervalToDuration({
                start: new Date(track.date),
                end: new Date(next),
              });
              const diff = +add(0, interval);
              (average as number) += diff;
            }
          });
          average /= tracks.length - 1;
          if (average > 0) {
            average = intervalToDuration({
              start: 0,
              end: average,
            });
            return formatDuration(limitDuration(average));
          }
          return null;
        })(),
      },
    [tracks]
  );

  const onBackClick = () => {
    navigate(Path.Home);
  };

  const onFabClick = () => {
    createNewTrack(id).then(() => {
      setShouldFetchCards(true);
    });
  };

  useEffect(() => {
    if (!id) {
      navigate(Path.Home);
    } else {
      fetchTracks(id);
    }
  }, [id]);

  return (
    <S.StyledTracker onFabClick={onFabClick} fabText="Track Event" cardCount={tracks.length}>
      {metrics && (
        <S.Metrics $gap="1.6rem">
          <M02IconButton icon="back" text="Back to Dashboard" onClick={onBackClick} />
          {card && (
            <S.Title as="h1" $type="h2">
              {card.name}
            </S.Title>
          )}
          {metrics.lastTracked && <M05CardDetailField title="Last Tracked" detail={metrics.lastTracked} />}
          {metrics.trackAverage && <M05CardDetailField title="Track Average" detail={metrics.trackAverage} />}
          {metrics.lifespan && <M05CardDetailField title="Lifespan" detail={metrics.lifespan} />}
        </S.Metrics>
      )}
      <S.GridList role="list">
        {tracks.map((item, index) => (
          <S.ListItem key={item.id} role="listitem">
            <O02TrackCard key={item.id} number={index + 1} data={item} previousDate={index > 0 ? tracks[index - 1].date : undefined} />
          </S.ListItem>
        ))}
      </S.GridList>
    </S.StyledTracker>
  );
};

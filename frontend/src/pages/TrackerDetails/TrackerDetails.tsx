import { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type TrackerDetailsParams = {
  id: string;
};

export const TrackerDetails = (): ReactElement => {
  const { id } = useParams<TrackerDetailsParams>();

  useEffect(() => {
    if (!id) {
      console.log('no id redirect');
    }
  }, [id]);

  return <div>TRacker Details PAge {id}</div>;
};

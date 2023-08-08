import axios, { AxiosResponse } from 'axios';
import { DBTrackData } from './api.types';

const endpoint = '/api/';
const trackEndpoint = `${endpoint}track`;

export type TrackReturnData = {
  count: number;
  track: DBTrackData;
};

export const apiCreateNewTrack = (data: DBTrackData): Promise<TrackReturnData> => {
  return new Promise((resolve, reject) => {
    axios
      .post(trackEndpoint, data)
      .then((response: AxiosResponse<TrackReturnData>) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

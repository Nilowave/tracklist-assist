import axios, { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { DBTrackData } from './api.types';
import { Endpoints } from '../data/enum/Endpoints';

const endpoint = '/api/';
const trackEndpoint = `${endpoint}track`;

interface RequestController<T> {
  controller: AbortController;
  request: Promise<T>;
}

interface TrackStoreState {
  tracks: Array<DBTrackData>;
  setTracks: (tracks: Array<DBTrackData>) => void;
  fetchTracks: (item: string, query?: string) => RequestController<void>;
  deleteTrack: (id: string) => RequestController<AxiosResponse>;
  updateTrack: (data: DBTrackData) => Promise<DBTrackData | void>;
  createNewTrack: (itemId: string) => Promise<TrackReturnData>;
}

export type TrackReturnData = {
  count: number;
  track: DBTrackData;
};

export const useTrackStore = create<TrackStoreState>((set, state) => ({
  tracks: [],
  setTracks: (tracks) => set({ tracks }),
  fetchTracks: (item: string, query?: string) => {
    const controller = new AbortController();
    const fetchEndpoint = query ? `${Endpoints.SEARCH_TRACK}?q=${encodeURIComponent(query)}` : `${Endpoints.TRACKS}${item}`;
    const request = axios.get(fetchEndpoint, { signal: controller.signal }).then((response) => {
      const tracks = response.data.data || [];
      set({ tracks });
    });

    return { controller, request };
  },
  deleteTrack: (trackId: string) => {
    const controller = new AbortController();
    const request = axios.delete(`${Endpoints.TRACK}${trackId}`, { signal: controller.signal });
    const tracks = state().tracks.filter((item) => item.id !== trackId);
    set({ tracks });
    return { controller, request };
  },
  updateTrack: async (data: DBTrackData) => {
    try {
      const response = await axios.put(`${Endpoints.TRACK}${data.id}`, data);

      // update tracks state
      const { tracks } = state();
      const update = tracks.map((item) => {
        if (item.id === data.id) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      });
      set({ tracks: update });

      return response.data;
    } catch (error) {
      return error;
    }
  },
  createNewTrack: async (item: string) => {
    const newTrack = {
      item,
      date: Date.now(),
    };
    try {
      const response = await axios.post(trackEndpoint, newTrack);
      const { tracks } = state();
      const { data } = response;
      data.track.id = data.track._id;

      const update = [...tracks, data.track];
      console.log(update);

      set({ tracks: update });

      return response.data;
    } catch (error) {
      return error;
    }
  },
}));

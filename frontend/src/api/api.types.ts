export type Timestamps = {
  createdAt?: string;
  updatedAt?: string;
};

export type UserID = string;

export type DBCardData = Timestamps & {
  id: string;
  name: string;
  archived?: boolean;
  count?: number;
  last?: number;
  average?: Duration;
  intervals?: Array<Duration>;
};

export type Location = {
  lat: number;
  lon: number;
};

export type DBTrackData = Timestamps & {
  id: string;
  date: number;
  item: string;
  value?: number;
  notes?: string;
  image?: string;
  audio?: string;
  location?: Location;
  collab?: Array<UserID>;
  archived?: boolean;
};

export type DataResponse<T> = {
  data: {
    data: T;
  };
};

export type GetItemResponse = {
  data: DBCardData;
};

export type PutResponse = {
  id: string;
  status: number;
  message: string;
  success: boolean;
};

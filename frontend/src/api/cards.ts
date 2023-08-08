import axios, { AxiosResponse } from 'axios';
import { DBCardData, GetItemResponse } from './api.types';

const endpoint = '/api/';
const itemEndpoint = `${endpoint}item/`;
const itemsEndpoint = `${endpoint}items/`;

export const apiCreateNewCard = (data: DBCardData) => {
  return new Promise<DBCardData>((resolve, reject) => {
    axios
      .post(itemEndpoint, data)
      .then((response: AxiosResponse<DBCardData>) => {
        const { data: card } = response;
        resolve(card);
      })
      .catch((error) => reject(error));
  });
};

export const apiGetCards = () => {
  return new Promise<Array<DBCardData> | undefined>((resolve, reject) => {
    axios
      .get(itemsEndpoint)
      .then((response) => resolve(response.data.data))
      .catch((error) => reject(error));
  });
};

export const apiDeleteCard = (cardId: string) => {
  return axios.delete(`${itemEndpoint}${cardId}`);
};

export const apiUpdateCard = async (data: DBCardData) => {
  return new Promise<DBCardData | undefined>((resolve, reject) => {
    axios
      .put(`${itemEndpoint}${data.id}`, data)
      .then((update) => resolve(update.data))
      .catch((error) => reject(error));
  });
};

export const trackNewItem = async (data: DBCardData): Promise<DBCardData | undefined> => {
  // const newDate = Date.now();
  // const { tracks } = data;

  // const update = [...tracks, newDate];
  const submitData: DBCardData = {
    name: data.name,
    // tracks: update,
    id: data.id,
  };

  if (data.id) {
    await axios.put(`/api/item/${data.id}`, submitData);

    const update = await axios.get<GetItemResponse>(`/api/item/${data.id}`);
    const updateData = update.data.data;

    return updateData;
  }

  return;
};

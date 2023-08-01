import axios from 'axios';
import { CardData } from '../components/organisms/O01DashboardCard/O01DashboardCard';

type GetItemResponse = {
  data: CardData;
};

type PutResponse = {
  id: string;
  status: number;
  message: string;
  success: boolean;
};

export const updateItem = async (data: CardData): Promise<PutResponse> => {
  const response = await axios.put(`/api/item/${data._id}`, data);
  return { status: response.status, ...response.data };
};

export const trackNewItem = async (data: CardData): Promise<CardData | undefined> => {
  const newDate = Date.now();
  const { tracks } = data;

  const update = [...tracks, newDate];
  const submitData: CardData = {
    name: data.name,
    tracks: update,
    _id: data._id,
  };

  if (data._id) {
    await axios.put(`/api/item/${data._id}`, submitData);

    const update = await axios.get<GetItemResponse>(`/api/item/${data._id}`);
    const updateData = update.data.data;

    return updateData;
  }

  return;
};

import axios, { AxiosResponse } from 'axios';
import { create } from 'zustand';
import { DBCardData } from './api.types';
import { Endpoints } from '../data/enum/Endpoints';

interface RequestController<T> {
  controller: AbortController;
  request: Promise<T>;
}

interface CardsStoreState {
  cards: Array<DBCardData>;
  setCards: (cards: Array<DBCardData>) => void;
  fetchCards: (query?: string) => RequestController<void>;
  deleteCard: (id: string) => RequestController<AxiosResponse>;
  updateCard: (data: DBCardData) => Promise<DBCardData | void>;
  createNewCard: (data: DBCardData) => Promise<DBCardData | void>;
}

export const useCardStore = create<CardsStoreState>((set) => ({
  cards: [],

  setCards: (cards) => set({ cards }),

  fetchCards: (query?: string) => {
    const controller = new AbortController();
    const fetchEndpoint = query ? `${Endpoints.SEARCH}?q=${encodeURIComponent(query)}` : Endpoints.ITEMS;
    const request = axios
      .get(fetchEndpoint, { signal: controller.signal })
      .then((response) => {
        const cards = response.data.data || [];
        set({ cards });
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });

    return { controller, request };
  },

  deleteCard: (cardId: string) => {
    const controller = new AbortController();
    const request = axios.delete(`${Endpoints.ITEM}${cardId}`, { signal: controller.signal });
    return { controller, request };
  },

  createNewCard: async (data: DBCardData) => {
    // const controller = new AbortController();
    try {
      const response = await axios.post(Endpoints.ITEM, data);
      return response.data;
    } catch (error) {
      return error;
    }
    // return { controller, request };
  },

  updateCard: async (data: DBCardData) => {
    try {
      const response = await axios.put(`${Endpoints.ITEM}${data.id}`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  },
}));

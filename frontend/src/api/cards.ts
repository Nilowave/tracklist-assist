import axios from 'axios';
import { create } from 'zustand';
import { DBCardData } from './api.types';
import { Endpoints } from '../data/enum/Endpoints';

interface CardsStoreState {
  cards: Array<DBCardData>;
  setCards: (cards: Array<DBCardData>) => void;
  fetchCards: (query?: string) => Promise<DBCardData | void>;
  deleteCard: (id: string) => Promise<void>;
  updateCard: (data: DBCardData) => Promise<DBCardData | void>;
  createNewCard: (data: DBCardData) => Promise<DBCardData | void>;
}

export const useCardsStore = create<CardsStoreState>((set) => ({
  cards: [],

  setCards: (cards) => set({ cards }),

  fetchCards: async (query?: string) => {
    try {
      const fetchEndpoint = query ? `${Endpoints.SEARCH}?q=${encodeURIComponent(query)}` : Endpoints.ITEMS;
      const response = await axios.get(fetchEndpoint);
      const cards = response.data.data || [];
      set({ cards });
      return cards;
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
    return [];
  },

  deleteCard: async (cardId: string) => {
    return axios.delete(`${Endpoints.ITEM}${cardId}`);
  },

  createNewCard: async (data: DBCardData) => {
    const response = await axios.post(Endpoints.ITEM, data);
    return response.data;
  },

  updateCard: async (data: DBCardData) => {
    const response = await axios.put(`${Endpoints.ITEM}${data.id}`, data);
    return response.data;
  },
}));

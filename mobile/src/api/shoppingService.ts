import { apiClient } from './client';

export const shoppingApi = {
  getLists: async (type = 'All') => {
    const res = await apiClient.get(`/shopping/lists?userId=1&type=${type}`);
    return res.data.data;
  },
  getListDetails: async (listId: number) => {
    const res = await apiClient.get(`/shopping/lists/${listId}`);
    return res.data.data;
  },
  toggleItem: async (itemId: number) => {
    const res = await apiClient.put(`/shopping/items/${itemId}/toggle`);
    return res.data;
  },
  updateItem: async (itemId: number, payload: any) => {
    const res = await apiClient.put(`/shopping/items/${itemId}`, payload);
    return res.data;
  },
  deleteItem: async (itemId: number) => {
    const res = await apiClient.delete(`/shopping/items/${itemId}`);
    return res.data;
  },
  addItem: async (listId: number, item: any) => {
    const res = await apiClient.post(`/shopping/lists/${listId}/items`, item);
    return res.data;
  },
  createCustomList: async (payload: any) => {
    const res = await apiClient.post('/shopping/lists/custom', payload);
    return res.data.data;
  },
  confirmPurchase: async (listId: number) => {
    const res = await apiClient.post(`/shopping/lists/${listId}/confirm-purchase`);
    return res.data;
  },
};
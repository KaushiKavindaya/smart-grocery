import { apiClient } from './client';

export const authApi = {
  register: async (payload: { fullName: string; email: string; password: string }) => {
    const res = await apiClient.post('/auth/register', payload);
    return res.data;
  },
  login: async (payload: { email: string; password: string }) => {
    const res = await apiClient.post('/auth/login', payload);
    return res.data;
  },
  forgotPassword: async (payload: { email: string }) => {
    const res = await apiClient.post('/auth/forgot-password', payload);
    return res.data;
  },
};
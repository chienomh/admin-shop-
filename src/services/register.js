import apiClient from './apiService';

export const registerAPI = params => apiClient.post('/user/add', params);

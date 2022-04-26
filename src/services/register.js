import apiClient from './apiService';

export const registerAPI = params => apiClient.post('/admin/user/add', params);

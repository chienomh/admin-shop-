import apiClient from './apiService';

export const getListMessage = () => apiClient.get('/admin/contact/list');

export const deleteMessage = id => apiClient.get(`/admin/contact/delete/${id}`);

export const sendMessage = params =>
  apiClient.post(`/admin/contact/response/${params.id}`, params.data);

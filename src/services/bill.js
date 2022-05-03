import apiClient from './apiService';

export const getListBill = () => apiClient.get('/admin/bill/list');

export const getDetailBill = param => apiClient.get(`/admin/bill/${param}`);

export const changeStatusAPI = params =>
  apiClient.get(
    `/admin/bill/change-status/${params.idBill}?billStatus=${params.status}`,
  );

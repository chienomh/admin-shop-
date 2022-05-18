import apiClient from './apiService';

export const getListBill = () => apiClient.get('/admin/bill/list');

export const getDetailBill = param => apiClient.get(`/admin/bill/${param}`);

export const changeStatusAPI = params => {
  console.log(params);
  return apiClient.post(
    `admin/bill/change-status/${params.idBill}`,
    params.data,
  );
};

export const addShipperAPI = params => {
  return apiClient.put(`/admin/bill/update-shipper/${params.id}`, params.data);
};

export const GetRevenue = params =>
  apiClient.get(`/admin/dashboard/body?month=${params}&sort=0&year=2022`);

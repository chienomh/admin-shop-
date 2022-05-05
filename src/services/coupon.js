import apiClient from './apiService';

export const getListCoupon = () => apiClient.get('/admin/coupon/list?sort=0');

export const addCoupon = params => apiClient.post('/admin/coupon/add', params);

export const deleteCoupon = id =>
  apiClient.get(`/admin/coupon/delete?id=${id}`);

export const editCouponAPI = params =>
  apiClient.put('/admin/coupon/modified', params);

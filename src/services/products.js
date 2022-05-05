import apiClient from './apiService';

export const UploadFile = params =>
  apiClient.post(`/admin/product/image`, params);

export const AddProduct = params =>
  apiClient.post('/admin/product/add', params);

export const getListProduct = params => apiClient.get('/admin/product/list');

export const getProductById = params =>
  apiClient.get(`/admin/product/${params}`);

export const updateProduct = params =>
  apiClient.put(`/admin/product/modified/${params.id}`, params.data);

export const deleteProduct = params =>
  apiClient.get(`/admin/product/delete?id=${params}`);

export const getListReview = param =>
  apiClient.get(`/review/list?productId=${param}`);

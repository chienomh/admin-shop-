import apiClient from './apiService';

export const getTokenAPI = params =>
  apiClient.post(
    `/login?username=${params.userName}&password=${params.password}`,
  );

export const getInforDashboard = () => apiClient.get(`/admin/dashboard/header`);

export const getInforAPI = () => apiClient.get(`/member/me`);

export const getDetailUser = params => apiClient.get(`/admin/user/${params}`);

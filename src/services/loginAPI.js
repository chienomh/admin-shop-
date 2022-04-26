import apiClient from './apiService';

export const getTokenAPI = params =>
  apiClient.post(
    `/login?username=${params.userName}&password=${params.password}`,
  );

export const getInforAPI = () => apiClient.get(`/member/me`);

import apiClient from './apiService';

export const getListUser = params => apiClient.get(`/admin/user/list`);

export const banUser = params =>
  apiClient.get(
    `/admin/user/ban-user?banEnum=${params.banEnum}&userId=${params.userId}`,
  );

export const ChangePasswordAPI = params =>
  apiClient.get(
    `/user/change-password?newPassword=${params.newPassword}&oldPassword=${params.oldPassword}&username=${params.username}`,
  );

import api from './api';

const userService = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/me', data),
};

export default userService;

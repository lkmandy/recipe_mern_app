// Service layer for user profile API calls.
// getProfile fetches any user's public data; updateProfile edits only the currently authenticated user.
import api from './api';

const userService = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/me', data),
};

export default userService;

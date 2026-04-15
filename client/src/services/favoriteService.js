import api from './api';

const favoriteService = {
  getAll: () => api.get('/favorites'),
  toggle: (recipeId) => api.post(`/favorites/${recipeId}`),
  getStatus: (recipeId) => api.get(`/favorites/${recipeId}/status`),
};

export default favoriteService;

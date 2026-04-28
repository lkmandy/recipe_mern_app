// Service layer for saved-recipe (favorite) API calls.
// toggle() adds a saved entry if none exists, or removes it — acting as a single save/unsave endpoint.
import api from './api';

const favoriteService = {
  getAll: () => api.get('/favorites'),
  toggle: (recipeId) => api.post(`/favorites/${recipeId}`),
  getStatus: (recipeId) => api.get(`/favorites/${recipeId}/status`),
};

export default favoriteService;

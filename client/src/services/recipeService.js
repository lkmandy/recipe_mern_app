// Service layer for all recipe API calls.
// Keeps HTTP request logic out of components so pages only call named methods.
import api from './api';

const recipeService = {
  getAll: (params) => api.get('/recipes', { params }),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (data) => api.post('/recipes', data),
  update: (id, data) => api.put(`/recipes/${id}`, data),
  remove: (id) => api.delete(`/recipes/${id}`),
};

export default recipeService;

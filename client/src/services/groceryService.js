// Service layer for all grocery list API calls.
// Keeps HTTP request logic out of components so pages only call named methods.
import api from './api';

const groceryService = {
  getList:        ()   => api.get('/grocery'),
  generate:       ()   => api.post('/grocery/generate'),
  toggleItem:     (id) => api.put(`/grocery/${id}/toggle`),
  clearCompleted: ()   => api.delete('/grocery/clear'),
  resetList:      ()   => api.put('/grocery/reset'),
};

export default groceryService;
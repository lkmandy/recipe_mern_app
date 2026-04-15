import { useState, useEffect } from 'react';
import favoriteService from '../services/favoriteService';
import { useAuth } from '../context/AuthContext';

/**
 * Manages the current user's saved recipes.
 * Exposes a toggle function and a helper to check if a recipe is saved.
 */
const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);  // Array of recipe objects
  const [loading, setLoading]     = useState(false);

  useEffect(() => {
    if (!user) { setFavorites([]); return; }
    setLoading(true);
    favoriteService.getAll()
      .then((res) => setFavorites(res.data))
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, [user]);

  const toggle = async (recipeId) => {
    if (!user) return;
    try {
      const { data } = await favoriteService.toggle(recipeId);
      setFavorites((prev) =>
        data.saved
          ? [...prev, { _id: recipeId }]
          : prev.filter((r) => r._id !== recipeId)
      );
    } catch (err) {
      console.error('Toggle favorite failed:', err);
    }
  };

  const isSaved = (recipeId) => favorites.some((r) => r._id === recipeId);

  return { favorites, loading, toggle, isSaved };
};

export default useFavorites;

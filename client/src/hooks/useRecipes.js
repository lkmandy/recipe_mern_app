import { useState, useEffect, useCallback } from 'react';
import recipeService from '../services/recipeService';

/**
 * Fetches a paginated, filtered list of recipes.
 * Accepts a params object matching the backend query string.
 */
const useRecipes = (params = {}) => {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal]     = useState(0);
  const [pages, setPages]     = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await recipeService.getAll(params);
      setRecipes(data.recipes);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load recipes');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => { fetchRecipes(); }, [fetchRecipes]);

  return { recipes, total, pages, loading, error, refetch: fetchRecipes };
};

export default useRecipes;

// Page for editing an existing recipe. Fetches the recipe on mount and redirects non-authors back to /recipes
// so they cannot modify another user's recipe via a direct URL.
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, useToast } from '@chakra-ui/react';
import RecipeForm from '../components/recipe/RecipeForm';
import recipeService from '../services/recipeService';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';
import ErrorAlert from '../components/ui/ErrorAlert';

export default function EditRecipePage() {
  const { id }   = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast    = useToast();

  const [recipe,  setRecipe]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => {
    recipeService.getById(id)
      .then(({ data }) => {
        if (data.author?._id !== user?._id) {
          navigate('/recipes');
          return;
        }
        setRecipe(data);
      })
      .catch(() => setError('Recipe not found.'))
      .finally(() => setLoading(false));
  }, [id, user, navigate]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await recipeService.update(id, data);
      toast({ title: 'Recipe updated!', status: 'success', duration: 3000 });
      navigate(`/recipes/${id}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;
  if (error)   return <Box maxW="600px" mx="auto" mt={10}><ErrorAlert message={error} /></Box>;

  return (
    <Box maxW="700px" mx="auto" px={6} py={10}>
      <Heading size="lg" mb={8}>Edit recipe</Heading>
      <RecipeForm initialValues={recipe} onSubmit={handleSubmit} isLoading={saving} />
    </Box>
  );
}

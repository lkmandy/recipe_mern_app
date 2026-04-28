// Page that hosts the new-recipe form. On successful submission it navigates to the newly created recipe's detail page.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, useToast } from '@chakra-ui/react';
import RecipeForm from '../components/recipe/RecipeForm';
import recipeService from '../services/recipeService';

export default function CreateRecipePage() {
  const navigate    = useNavigate();
  const toast       = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: created } = await recipeService.create(data);
      toast({ title: 'Recipe created!', status: 'success', duration: 3000 });
      navigate(`/recipes/${created._id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="700px" mx="auto" px={6} py={10}>
      <Heading size="lg" mb={8}>Add a new recipe</Heading>
      <RecipeForm onSubmit={handleSubmit} isLoading={loading} />
    </Box>
  );
}

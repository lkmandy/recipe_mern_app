// Renders a responsive grid of RecipeCard components.
// Handles the empty state so calling pages don't need their own "no results" UI.
import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import RecipeCard from './RecipeCard';
import useFavorites from '../../hooks/useFavorites';

export default function RecipeGrid({ recipes }) {
  const { isSaved, toggle } = useFavorites();

  if (!recipes || recipes.length === 0) {
    return (
      <Box textAlign="center" py={16}>
        <Text fontSize="lg" color="gray.400">No recipes found.</Text>
        <Text fontSize="sm" color="gray.400" mt={1}>Try a different search or filter.</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={5}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          isSaved={isSaved(recipe._id)}
          onToggleSave={toggle}
        />
      ))}
    </SimpleGrid>
  );
}

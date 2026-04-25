import { Box, Heading, Text } from '@chakra-ui/react';
import RecipeGrid from '../components/recipe/RecipeGrid';
import useFavorites from '../hooks/useFavorites';

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites();

  return (
    <Box maxW="1200px" mx="auto" px={6} py={10}>
      <Heading size="lg" mb={2}>Saved Recipes</Heading>
      <Text color="gray.500" mb={8}>
        {favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}
      </Text>

      <RecipeGrid recipes={favorites} loading={loading} />
    </Box>
  );
}

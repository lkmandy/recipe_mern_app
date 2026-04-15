import { Box, Heading, Text } from '@chakra-ui/react';
import RecipeGrid from '../components/recipe/RecipeGrid';
import Spinner from '../components/ui/Spinner';
import useFavorites from '../hooks/useFavorites';

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites();

  return (
    <Box maxW="1200px" mx="auto" px={6} py={10}>
      <Heading size="lg" mb={2}>Saved Recipes</Heading>
      <Text color="gray.500" mb={8}>{favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}</Text>

      {loading && <Spinner />}
      {!loading && <RecipeGrid recipes={favorites} />}
    </Box>
  );
}

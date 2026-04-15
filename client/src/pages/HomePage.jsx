import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button, SimpleGrid, Flex, Badge } from '@chakra-ui/react';
import RecipeGrid from '../components/recipe/RecipeGrid';
import Spinner from '../components/ui/Spinner';
import ErrorAlert from '../components/ui/ErrorAlert';
import useRecipes from '../hooks/useRecipes';

const CATEGORIES = ['Chicken', 'Pasta', 'Vegetarian', 'Dessert', 'Seafood', 'Breakfast'];

export default function HomePage() {
  const { recipes, loading, error } = useRecipes({ limit: 8, sort: 'newest' });

  return (
    <Box maxW="1200px" mx="auto" px={6} py={10}>

      {/* Hero */}
      <Box textAlign="center" mb={14}>
        <Heading as="h1" size="2xl" mb={4}>
          Discover and share great recipes
        </Heading>
        <Text color="gray.500" fontSize="lg" maxW="540px" mx="auto" mb={8}>
          Browse thousands of community recipes, save your favourites, and share your own creations.
        </Text>
        <Flex justify="center" gap={4}>
          <Button as={Link} to="/recipes" colorScheme="orange" size="lg">Browse Recipes</Button>
          <Button as={Link} to="/register" variant="outline" size="lg">Join the Community</Button>
        </Flex>
      </Box>

      {/* Category pills */}
      <Box mb={12}>
        <Heading size="md" mb={4}>Browse by category</Heading>
        <SimpleGrid columns={{ base: 3, md: 6 }} spacing={3}>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              as={Link}
              to={`/recipes?category=${cat}`}
              variant="outline"
              colorScheme="orange"
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </SimpleGrid>
      </Box>

      {/* Latest recipes */}
      <Box>
        <Flex justify="space-between" align="center" mb={5}>
          <Heading size="md">Latest recipes</Heading>
          <Button as={Link} to="/recipes" variant="ghost" colorScheme="orange" size="sm">
            View all →
          </Button>
        </Flex>

        {loading && <Spinner />}
        {error   && <ErrorAlert message={error} />}
        {!loading && !error && <RecipeGrid recipes={recipes} />}
      </Box>

    </Box>
  );
}

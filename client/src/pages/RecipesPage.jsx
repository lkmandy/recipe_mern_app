import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box, Heading, Flex, Select, SimpleGrid, Button, Text,
} from '@chakra-ui/react';
import RecipeGrid from '../components/recipe/RecipeGrid';
import SearchBar from '../components/ui/SearchBar';
import Spinner from '../components/ui/Spinner';
import ErrorAlert from '../components/ui/ErrorAlert';
import useRecipes from '../hooks/useRecipes';

const CATEGORIES = [
  '', 'Beef','Chicken','Dessert','Lamb','Miscellaneous',
  'Pasta','Pork','Seafood','Side','Starter',
  'Vegan','Vegetarian','Breakfast','Goat',
];

export default function RecipesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search,     setSearch]     = useState(searchParams.get('search')     || '');
  const [category,   setCategory]   = useState(searchParams.get('category')   || '');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || '');
  const [sort,       setSort]       = useState(searchParams.get('sort')       || 'newest');
  const [page,       setPage]       = useState(Number(searchParams.get('page')) || 1);

  // Keep URL in sync with filters
  useEffect(() => {
    const params = {};
    if (search)     params.search     = search;
    if (category)   params.category   = category;
    if (difficulty) params.difficulty = difficulty;
    if (sort !== 'newest') params.sort = sort;
    if (page > 1)   params.page       = page;
    setSearchParams(params);
  }, [search, category, difficulty, sort, page, setSearchParams]);

  const { recipes, total, pages, loading, error } = useRecipes({
    search, category, difficulty, sort, page, limit: 12,
  });

  const clearFilters = () => {
    setSearch(''); setCategory(''); setDifficulty(''); setSort('newest'); setPage(1);
  };

  const hasFilters = search || category || difficulty || sort !== 'newest';

  return (
    <Box maxW="1200px" mx="auto" px={6} py={10}>
      <Heading size="lg" mb={6}>Browse Recipes</Heading>

      {/* Filter bar */}
      <Flex gap={3} mb={6} wrap="wrap" align="center">
        <Box flex={1} minW="200px">
          <SearchBar
            value={search}
            onChange={(val) => { setSearch(val); setPage(1); }}
            onClear={() => { setSearch(''); setPage(1); }}
          />
        </Box>

        <Select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          maxW="180px"
          bg="white"
        >
          <option value="">All categories</option>
          {CATEGORIES.filter(Boolean).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>

        <Select
          value={difficulty}
          onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
          maxW="150px"
          bg="white"
        >
          <option value="">Any difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </Select>

        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          maxW="150px"
          bg="white"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A – Z</option>
        </Select>

        {hasFilters && (
          <Button variant="ghost" colorScheme="gray" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </Flex>

      {/* Result count */}
      {!loading && (
        <Text fontSize="sm" color="gray.500" mb={4}>
          {total} {total === 1 ? 'recipe' : 'recipes'} found
        </Text>
      )}

      {loading && <Spinner />}
      {error   && <ErrorAlert message={error} />}
      {!loading && !error && <RecipeGrid recipes={recipes} />}

      {/* Pagination */}
      {pages > 1 && (
        <Flex justify="center" gap={2} mt={8}>
          <Button
            size="sm"
            isDisabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Prev
          </Button>
          <Text alignSelf="center" fontSize="sm" color="gray.600">
            Page {page} of {pages}
          </Text>
          <Button
            size="sm"
            isDisabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </Button>
        </Flex>
      )}
    </Box>
  );
}

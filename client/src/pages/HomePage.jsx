// Landing page. Showcases the app's value proposition, a category browser, featured recipes, and feature highlights.
// Conditionally shows a call-to-action section only for users who are not logged in.
import { Link, useLocation } from 'react-router-dom';
import {
  Box, Flex, Heading, Text, Button, SimpleGrid,
} from '@chakra-ui/react';
import Spinner from '../components/ui/Spinner';
import ErrorAlert from '../components/ui/ErrorAlert';
import RecipeGrid from '../components/recipe/RecipeGrid';
import useRecipes from '../hooks/useRecipes';
import { useAuth } from '../context/AuthContext';

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Browse & save recipes',
    desc: 'Explore recipes and save the ones you want to cook',
  },
  {
    step: '2',
    title: 'Select your recipes',
    desc: 'Choose recipes you want to include in your grocery list',
  },
  {
    step: '3',
    title: 'Generate your grocery list',
    desc: 'Instantly create a combined shopping list with all ingredients',
  },
];

const STATS = [
  { value: '500+', label: 'Recipes in the community' },
  { value: '3 min', label: 'To generate your grocery list' },
  { value: '100%', label: 'Ingredients merged automatically' },
  { value: '0', label: 'Lists written by hand' },
];

const CATEGORIES = [
  { label: 'All' },
  { label: 'Chicken',    icon: '🍗' },
  { label: 'Beef',       icon: '🥩' },
  { label: 'Seafood',    icon: '🦐' },
  { label: 'Vegan',      icon: '🌿' },
  { label: 'Vegetarian', icon: '🥗' },
  { label: 'Pasta',      icon: '🍝' },
  { label: 'Soup',       icon: '🍲' },
  { label: 'Breakfast',  icon: '🥞' },
  { label: 'Dessert',    icon: '🎂' },
  { label: 'Side',       icon: '🍟' },
];

export default function HomePage() {
  const { user } = useAuth();
  const { recipes, loading, error } = useRecipes({ limit: 6, sort: 'newest' });
  const location = useLocation();
  const activeCategory = new URLSearchParams(location.search).get('category') || 'All';

  return (
    <Box>

      {/* Hero section — full-width background image with headline and CTA buttons */}
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} pt={6}>
      <Box
        position="relative"
        minH="480px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        borderRadius="2xl"
      >
        <Box
          position="absolute"
          inset={0}
          bgImage="url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80')"
          bgSize="cover"
          bgPosition="center"
          _after={{
            content: '""',
            position: 'absolute',
            inset: 0,
            bg: 'rgba(0,0,0,0.62)',
          }}
        />
        <Box
          position="relative"
          textAlign="center"
          px={6}
          py={20}
          zIndex={1}
          maxW="700px"
          mx="auto"
        >
          <Heading
            as="h1"
            fontSize={{ base: '34px', md: '52px' }}
            fontWeight="700"
            color="white"
            lineHeight="1.15"
            mb={5}
          >
            Turn recipes into<br />your grocery list
          </Heading>
          <Text
            fontSize={{ base: '15px', md: '18px' }}
            color="whiteAlpha.800"
            mb={10}
            lineHeight="1.7"
            maxW="520px"
            mx="auto"
          >
            Save recipes and instantly generate a complete shopping list with ingredients merged and quantities combined across every dish.
          </Text>
          <Flex gap={4} justify="center" wrap="wrap">
            <Button
              as={Link}
              to={user ? '/grocery' : '/register'}
              bg="#E8440A"
              color="white"
              size="lg"
              borderRadius="md"
              px={8}
              fontSize="15px"
              _hover={{ bg: '#C0380A' }}
            >
              {user ? 'My grocery list' : 'Get started free'}
            </Button>
            <Button
              as={Link}
              to="/recipes"
              variant="outline"
              borderColor="white"
              color="white"
              size="lg"
              borderRadius="md"
              px={8}
              fontSize="15px"
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              Browse recipes
            </Button>
          </Flex>
        </Box>
      </Box>
      </Box>

      {/* Category filter bar — pill links that pre-filter the recipes page */}
      <Box
        bg="white"
        borderBottom="1px"
        borderColor="gray.100"
        py={8}
        mt={10}
      >
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Heading
            size="md"
            fontWeight="600"
            color="gray.900"
            mb={5}
          >
            Explore recipes by category
          </Heading>
          <Flex gap={3} wrap="wrap" align="center">
            {CATEGORIES.map((cat) => {
              const isActive = cat.label === activeCategory;
              return (
                <Box
                  key={cat.label}
                  as={Link}
                  to={cat.label === 'All' ? '/recipes' : `/recipes?category=${cat.label}`}
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                  px={4}
                  py={2}
                  borderRadius="full"
                  border="1px"
                  borderColor={isActive ? 'transparent' : 'gray.200'}
                  bg={isActive ? '#E8440A' : 'white'}
                  color={isActive ? 'white' : 'gray.700'}
                  fontSize="14px"
                  fontWeight={isActive ? '600' : '400'}
                  cursor="pointer"
                  transition="all 0.18s ease"
                  boxShadow={isActive ? 'sm' : 'none'}
                  _hover={
                    !isActive
                      ? {
                          borderColor: '#E8440A',
                          color: '#E8440A',
                          transform: 'translateY(-2px)',
                          boxShadow: 'sm',
                        }
                      : {}
                  }
                >
                  {cat.icon && <Text fontSize="15px">{cat.icon}</Text>}
                  {cat.label}
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Box>

      {/* Featured recipes — the 6 most recently added recipes */}
      <Box bg="white" py={16}>
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Heading
            size="xl"
            fontWeight="700"
            textAlign="center"
            mb={3}
            color="gray.900"
          >
            Featured Recipes
          </Heading>
          <Text
            fontSize="15px"
            color="gray.400"
            textAlign="center"
            mb={10}
          >
            Save recipes to automatically build your grocery list
          </Text>

          {loading && <Spinner />}
          {error && <ErrorAlert message={error} />}
          {!loading && !error && <RecipeGrid recipes={recipes} />}
        </Box>
      </Box>

      {/* Feature highlight cards explaining the app's benefits */}
      <Box bg="gray.50" py={16}>
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Heading
            size="xl"
            fontWeight="700"
            textAlign="center"
            mb={12}
            color="gray.900"
          >
            Why Nyama?
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>

            <Box bg="white" border="1px" borderColor="gray.100" borderRadius="xl" p={6}>
              <Flex
                w="36px" h="36px"
                borderRadius="md"
                bg="orange.50"
                align="center"
                justify="center"
                mb={5}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8 3v10" stroke="#E8440A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Flex>
              <Text fontWeight="700" fontSize="15px" mb={3} color="gray.900">
                No more manual lists
              </Text>
              <Text fontSize="13px" color="gray.500" lineHeight="1.7">
               Your grocery list builds itself from saved recipes.
              </Text>
            </Box>

            <Box bg="white" border="1px" borderColor="gray.100" borderRadius="xl" p={6}>
              <Flex
                w="36px" h="36px"
                borderRadius="md"
                bg="orange.50"
                align="center"
                justify="center"
                mb={5}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="4" width="12" height="9" rx="2" stroke="#E8440A" strokeWidth="1.2" />
                  <path d="M2 7h12" stroke="#E8440A" strokeWidth="1.2" />
                  <path d="M5 10h2M9 10h2" stroke="#E8440A" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </Flex>
              <Text fontWeight="700" fontSize="15px" mb={3} color="gray.900">
                Ingredients merged automatically
              </Text>
              <Text fontSize="13px" color="gray.500" lineHeight="1.7">
                Ingredients across recipes are combined into one clean, organized list.
              </Text>
            </Box>

            <Box bg="white" border="1px" borderColor="gray.100" borderRadius="xl" p={6}>
              <Flex
                w="36px" h="36px"
                borderRadius="md"
                bg="orange.50"
                align="center"
                justify="center"
                mb={5}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke="#E8440A" strokeWidth="1.2" />
                  <path d="M8 5v3l2 1.5" stroke="#E8440A" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </Flex>
              <Text fontWeight="700" fontSize="15px" mb={3} color="gray.900">
                Shop smarter
              </Text>
              <Text fontSize="13px" color="gray.500" lineHeight="1.7">
               Get everything you need in one list, ready for your weekly shop.
              </Text>
            </Box>

          </SimpleGrid>
        </Box>
      </Box>
      {/* How it works — numbered steps pulled from the HOW_IT_WORKS constant above */}
      <Box bg="white" py={16}>
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Heading
            size="xl"
            fontWeight="700"
            textAlign="center"
            mb={3}
            color="gray.900"
          >
            How It Works
          </Heading>
          <Text
            fontSize="15px"
            color="gray.400"
            textAlign="center"
            mb={14}
          >
            From craving to checkout in three simple steps
          </Text>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={8}
            position="relative"
          >

            {HOW_IT_WORKS.map((item) => (
              <Box key={item.step} textAlign="center" px={4}>
                <Flex
                  w="64px"
                  h="64px"
                  borderRadius="full"
                  bg="#E8440A"
                  color="white"
                  align="center"
                  justify="center"
                  fontWeight="700"
                  fontSize="22px"
                  mx="auto"
                  mb={6}
                  position="relative"
                  zIndex={1}
                >
                  {item.step}
                </Flex>
                <Heading size="sm" fontWeight="700" mb={3} color="gray.900">
                  {item.title}
                </Heading>
                <Text fontSize="13px" color="gray.500" lineHeight="1.7">
                  {item.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* Call-to-action banner — only shown to unauthenticated visitors */}
      {!user && (
        <Box bg="#E8440A" py={16} mt={20} textAlign="center" px={4}>
          <Heading color="white" size="xl" fontWeight="700" mb={4}>
            Stop writing grocery lists manually
          </Heading>
          <Text
            color="whiteAlpha.800"
            fontSize="16px"
            mb={8}
            maxW="500px"
            mx="auto"
          >
            Let Nyama turn your recipes into a complete shopping list in seconds.
          </Text>
          <Flex gap={4} justify="center" wrap="wrap">
            <Button
              as={Link}
              to="/register"
              bg="white"
              color="#E8440A"
              size="lg"
              borderRadius="md"
              px={10}
              fontWeight="600"
              _hover={{ bg: 'orange.50' }}
            >
              Create a free account
            </Button>
            <Button
              as={Link}
              to="/recipes"
              variant="outline"
              borderColor="white"
              color="white"
              size="lg"
              borderRadius="md"
              px={8}
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              Browse recipes first
            </Button>
          </Flex>
        </Box>
      )}

    </Box>
  );
}


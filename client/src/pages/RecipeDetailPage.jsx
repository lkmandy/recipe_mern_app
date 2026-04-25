import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import RecipeDetailSkeleton from '../components/recipe/RecipeDetailSkeleton';
import {
  Box, Heading, Text, Image, Badge, Button, Flex, SimpleGrid,
  UnorderedList, ListItem, Divider, useToast,
} from '@chakra-ui/react';
import recipeService from '../services/recipeService';
import favoriteService from '../services/favoriteService';
import { useAuth } from '../context/AuthContext';
import { formatTime } from '../utils/formatters';
import Spinner from '../components/ui/Spinner';
import ErrorAlert from '../components/ui/ErrorAlert';

export default function RecipeDetailPage() {
  const { id }      = useParams();
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const toast       = useToast();

  const [recipe,  setRecipe]  = useState(null);
  const [saved,   setSaved]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await recipeService.getById(id);
        setRecipe(data);

        if (user) {
          const { data: status } = await favoriteService.getStatus(id);
          setSaved(status.saved);
        }
      } catch {
        setError('Recipe not found.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, user]);

  const handleToggleSave = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      const { data } = await favoriteService.toggle(id);
      setSaved(data.saved);
      toast({ title: data.saved ? 'Recipe saved' : 'Recipe removed', status: 'success', duration: 2000 });
    } catch {
      toast({ title: 'Could not update saved recipes', status: 'error', duration: 2000 });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this recipe? This cannot be undone.')) return;
    try {
      await recipeService.remove(id);
      toast({ title: 'Recipe deleted', status: 'success', duration: 2000 });
      navigate('/recipes');
    } catch {
      toast({ title: 'Could not delete recipe', status: 'error', duration: 2000 });
    }
  };

  if (loading) return <RecipeDetailSkeleton />;
  if (error)   return <Box maxW="600px" mx="auto" mt={10}><ErrorAlert message={error} /></Box>;

  const isAuthor = user && recipe.author?._id === user._id;
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <Box maxW="900px" mx="auto" px={6} py={10}>

      {/* Header */}
      <Flex justify="space-between" align="flex-start" mb={6} gap={4} wrap="wrap">
        <Box flex={1}>
          <Badge colorScheme="orange" mb={2}>{recipe.category}</Badge>
          {recipe.area && <Badge colorScheme="gray" ml={2} mb={2}>{recipe.area}</Badge>}
          <Heading as="h1" size="xl" mb={2}>{recipe.title}</Heading>
          <Text color="gray.500">{recipe.description}</Text>
          <Text fontSize="sm" color="gray.400" mt={2}>
            by{' '}
            <Text as={Link} to={`/users/${recipe.author?._id}`} color="orange.500">
              @{recipe.author?.username}
            </Text>
          </Text>
        </Box>

        <Flex gap={2} align="center">
          <Button
            onClick={handleToggleSave}
            variant="outline"
            colorScheme={saved ? 'red' : 'gray'}
            size="sm"
          >
            {saved ? '♥ Saved' : '♡ Save'}
          </Button>
          {isAuthor && (
            <>
              <Button as={Link} to={`/recipes/${id}/edit`} size="sm" colorScheme="orange" variant="outline">
                Edit
              </Button>
              <Button size="sm" colorScheme="red" variant="outline" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {/* Image */}
      {recipe.imageUrl && (
        <Image
          src={recipe.imageUrl}
          alt={recipe.title}
          w="full"
          maxH="400px"
          objectFit="cover"
          borderRadius="lg"
          mb={8}
          bg="gray.100"
        />
      )}

      {/* Stats */}
      <SimpleGrid columns={{ base: 2, sm: 4 }} spacing={4} mb={8}>
        {[
          { label: 'Prep time',  value: formatTime(recipe.prepTime) },
          { label: 'Cook time',  value: formatTime(recipe.cookTime) },
          { label: 'Total time', value: formatTime(totalTime) },
          { label: 'Servings',   value: `${recipe.servings} servings` },
        ].map(({ label, value }) => (
          <Box key={label} bg="gray.50" borderRadius="md" p={4} textAlign="center">
            <Text fontSize="xs" color="gray.500" mb={1}>{label}</Text>
            <Text fontWeight="medium">{value}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Divider mb={8} />

      {/* Ingredients + Instructions */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Box>
          <Heading size="md" mb={4}>Ingredients</Heading>
          <UnorderedList spacing={2} pl={2}>
            {recipe.ingredients.map((ing, i) => (
              <ListItem key={i} fontSize="sm">
                <Text as="span" fontWeight="medium">{ing.quantity}</Text>{' '}
                {ing.name}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Instructions</Heading>
          <Text fontSize="sm" color="gray.700" whiteSpace="pre-line" lineHeight="1.8">
            {recipe.instructions}
          </Text>
        </Box>
      </SimpleGrid>

      {recipe.tags?.length > 0 && (
        <Flex gap={2} mt={8} wrap="wrap">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="subtle" colorScheme="gray">#{tag}</Badge>
          ))}
        </Flex>
      )}

    </Box>
  );
}

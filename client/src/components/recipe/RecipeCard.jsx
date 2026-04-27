// Displays a single recipe as a clickable card. The save button stops click propagation
// so it doesn't trigger the card's navigation link at the same time.
import { Link } from 'react-router-dom';
import {
  Box, Image, Text, Badge, Flex, IconButton, Heading, Tooltip,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { formatTime } from '../../utils/formatters';

export default function RecipeCard({ recipe, isSaved, onToggleSave }) {
  const { user } = useAuth();
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return (
    <Box
      as={Link}
      to={`/recipes/${recipe._id}`}
      bg="white"
      borderRadius="lg"
      border="1px"
      borderColor="gray.200"
      overflow="hidden"
      display="block"
      _hover={{ borderColor: 'orange.300', transform: 'translateY(-2px)', transition: 'all 0.15s' }}
      transition="all 0.15s"
    >
      {/* Thumbnail */}
      <Box position="relative">
        <Image
          src={recipe.imageUrl || 'https://placehold.co/400x250?text=No+Image'}
          alt={recipe.title}
          w="full"
          h="180px"
          objectFit="cover"
          bg="gray.100"
        />

        {/* Save button   stops link propagation */}
        {user && (
          <Tooltip label={isSaved ? 'Remove from saved' : 'Save recipe'} placement="top">
            <IconButton
              aria-label="Toggle saved"
              icon={<span style={{ fontSize: '16px' }}>{isSaved ? '♥' : '♡'}</span>}
              position="absolute"
              top={2}
              right={2}
              size="sm"
              borderRadius="full"
              bg="white"
              color={isSaved ? 'red.400' : 'gray.500'}
              _hover={{ bg: 'white', color: 'red.400' }}
              onClick={(e) => {
                e.preventDefault();   // Don't navigate to recipe detail
                onToggleSave(recipe._id);
              }}
            />
          </Tooltip>
        )}

        <Badge
          position="absolute"
          bottom={2}
          left={2}
          colorScheme="orange"
          fontSize="10px"
          textTransform="none"
        >
          {recipe.category?.charAt(0).toUpperCase() + recipe.category?.slice(1).toLowerCase()}
        </Badge>
      </Box>

      {/* Body */}
      <Box p={4}>
        <Heading as="h3" size="sm" noOfLines={1} mb={1}>
          {recipe.title}
        </Heading>
        <Text fontSize="xs" color="gray.500" noOfLines={2} mb={3}>
          {recipe.description}
        </Text>

        <Flex justify="space-between" align="center" fontSize="xs" color="gray.500">
          <Flex gap={3}>
            {totalTime > 0 && <Text>⏱ {formatTime(totalTime)}</Text>}
            <Text>👤 {recipe.servings} servings</Text>
          </Flex>
          <Badge
            colorScheme={
              recipe.difficulty === 'Easy' ? 'green' :
              recipe.difficulty === 'Hard' ? 'red' : 'yellow'
            }
            variant="subtle"
            fontSize="10px"
            textTransform="none"
          >
            {recipe.difficulty?.charAt(0).toUpperCase() + recipe.difficulty?.slice(1).toLowerCase()}
          </Badge>
        </Flex>

        <Text fontSize="xs" color="gray.400" mt={2}>
          by @{recipe.author?.username || 'unknown'}
        </Text>
      </Box>
    </Box>
  );
}

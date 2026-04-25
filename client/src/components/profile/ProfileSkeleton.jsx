import { Box, Skeleton, SkeletonCircle, Flex, SimpleGrid } from '@chakra-ui/react';
import RecipeCardSkeleton from '../recipe/RecipeCardSkeleton';

export default function ProfileSkeleton() {
  return (
    <Box maxW="1000px" mx="auto" px={6} py={10}>
      
      {/* Profile header */}
      <Flex gap={6} align="flex-start" mb={10} wrap="wrap">
        <SkeletonCircle size="24" />
        <Box flex={1}>
          <Skeleton height="24px" width="40%" mb={3} />
          <Skeleton height="16px" width="60%" mb={2} />
          <Skeleton height="16px" width="30%" />
        </Box>
      </Flex>

      {/* Section title */}
      <Skeleton height="20px" width="30%" mb={6} />

      {/* Recipes grid */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {Array.from({ length: 6 }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

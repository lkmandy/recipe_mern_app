import { Box, Skeleton, SkeletonText, Flex } from '@chakra-ui/react';

export default function RecipeDetailSkeleton() {
  return (
    <Box maxW="900px" mx="auto" px={6} py={10}>
      {/* Title + description */}
      <Skeleton height="32px" width="60%" mb={4} 
      startColor="gray.200"
      endColor="gray.300"
      speed={0.8}
      />
      <Skeleton height="20px" width="40%" mb={6} 
      startColor="gray.200"
      endColor="gray.300"
      speed={0.8}
      />

      {/* Image */}
      <Skeleton height="400px" borderRadius="lg" mb={8} 
      startColor="gray.200"
      endColor="gray.300"
      speed={0.8}
      />

      {/* Stats */}
      <Flex gap={4} mb={8} wrap="wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height="80px" width="120px" borderRadius="md" 
          startColor="gray.200"
          endColor="gray.300"
          speed={0.8}
          />
        ))}
      </Flex>

      {/* Ingredients + instructions */}
      <SkeletonText noOfLines={8} spacing={4} />
    </Box>
  );
}

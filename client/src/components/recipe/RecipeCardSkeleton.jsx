import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function RecipeCardSkeleton() {
  return (
    <Box borderRadius="lg" overflow="hidden" bg="white" shadow="sm">
      <Skeleton
        height="180px"
        startColor="gray.200"
        endColor="gray.300"
        speed={0.8}
      />

      <Box p={4}>
        <Skeleton
          height="20px"
          mb={3}
          startColor="gray.200"
          endColor="gray.300"
          speed={0.8}
        />
        <SkeletonText
          noOfLines={2}
          spacing="2"
          startColor="gray.200"
          endColor="gray.300"
          speed={0.8}
        />
      </Box>
    </Box>
  );
}

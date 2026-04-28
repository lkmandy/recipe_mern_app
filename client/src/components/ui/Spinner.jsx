// Centered loading spinner with an optional text label. Used as a full-section loading state across pages.
import { Flex, Spinner as ChakraSpinner, Text } from '@chakra-ui/react';

export default function Spinner({ label = 'Loading...' }) {
  return (
    <Flex direction="column" align="center" justify="center" py={16} gap={3}>
      <ChakraSpinner size="lg" color="orange.400" thickness="3px" />
      <Text fontSize="sm" color="gray.500">{label}</Text>
    </Flex>
  );
}

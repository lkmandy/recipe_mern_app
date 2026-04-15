import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box textAlign="center" maxW="400px" mx="auto" py={24}>
      <Heading size="2xl" color="orange.400" mb={4}>404</Heading>
      <Heading size="md" mb={3}>Page not found</Heading>
      <Text color="gray.500" mb={8}>The page you are looking for does not exist.</Text>
      <Button as={Link} to="/" colorScheme="orange">Go home</Button>
    </Box>
  );
}

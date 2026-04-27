import { Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box textAlign="center" maxW="480px" mx="auto" py={16} px={4}>
      <Image
        src="/under-construction.gif"
        alt="Under construction"
        boxSize="220px"
        mx="auto"
        mb={6}
      />
      <Heading size="xl" mb={3}>Page Not Found</Heading>
      <Text color="gray.500" mb={8}>
       Oops!! this page isn’t on the menu, we couldn’t find it.
      </Text>
      <Button as={Link} to="/" colorScheme="orange" size="lg">
        Go home
      </Button>
    </Box>
  );
}

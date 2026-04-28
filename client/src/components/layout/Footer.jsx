// Site footer. Rendered at the bottom of every page via App.jsx.
import { Box, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box bg="#1a1a1a" borderTop="1px solid" borderColor="whiteAlpha.100" py={6}>
      <Text textAlign="center" fontSize="xs" letterSpacing="wide" color="gray.600">
        © 2026 Nyama. All rights reserved.
      </Text>
    </Box>
  );
}

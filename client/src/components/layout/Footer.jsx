// Site-wide footer rendered by App.jsx beneath every page.
import { Box, Flex, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box bg="#1a1a1a" py={5}>
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
          <img
            src="/nyama-logo.png"
            alt="Nyama"
            style={{ height: '20px', width: 'auto', filter: 'brightness(0) invert(1)' }}
          />
          <Text fontSize="12px" color="gray.600">
            © 2026 Nyama. All rights reserved.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

// Reusable error alert banner. Renders nothing when `message` is falsy, so callers can pass the error state directly.
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <Alert status="error" borderRadius="md" mb={4}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Button, FormControl, FormLabel, FormErrorMessage,
  Input, VStack, Heading, Text,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import ErrorAlert from '../ui/ErrorAlert';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim())    e.email    = 'Email is required';
    if (!password.trim()) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setServerError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={12} p={8} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
      <Heading size="lg" mb={2}>Welcome back</Heading>
      <Text color="gray.500" fontSize="sm" mb={6}>Log in to your account</Text>

      <ErrorAlert message={serverError} />

      <Box as="form" onSubmit={handleSubmit} noValidate>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="orange" w="full" isLoading={loading} loadingText="Logging in...">
            Log In
          </Button>
        </VStack>
      </Box>

      <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
        Don&apos;t have an account?{' '}
        <Text as={Link} to="/register" color="orange.500">Sign up</Text>
      </Text>
    </Box>
  );
}

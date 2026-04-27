// Registration form component. Validates fields client-side (including password confirmation)
// before calling the AuthContext register action, which creates the account and logs the user in immediately.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Button, FormControl, FormLabel, FormErrorMessage,
  Input, VStack, Heading, Text,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import ErrorAlert from '../ui/ErrorAlert';

export default function RegisterForm() {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [form, setForm]         = useState({ username: '', email: '', password: '', confirm: '' });
  const [errors, setErrors]     = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading]   = useState(false);

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim() || form.username.length < 3) e.username = 'Username must be at least 3 characters';
    if (!form.email.trim()) e.email = 'Email is required';
    if (form.password.length < 6)   e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setServerError('');
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate('/');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={12} mb={16} p={8} bg="white" borderRadius="lg" border="1px" borderColor="gray.200">
      <Heading size="lg" mb={2}>Create an account</Heading>
      <Text color="gray.500" fontSize="sm" mb={6}>Join the community and start sharing recipes</Text>

      <ErrorAlert message={serverError} />

      <Box as="form" onSubmit={handleSubmit} noValidate>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.username} isRequired>
            <FormLabel>Username</FormLabel>
            <Input value={form.username} onChange={(e) => set('username', e.target.value)} placeholder="jamiecooks" />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password} isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="Min. 6 characters" />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirm} isRequired>
            <FormLabel>Confirm password</FormLabel>
            <Input type="password" value={form.confirm} onChange={(e) => set('confirm', e.target.value)} placeholder="Repeat password" />
            <FormErrorMessage>{errors.confirm}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="orange" w="full" isLoading={loading} loadingText="Creating account...">
            Create Account
          </Button>
        </VStack>
      </Box>

      <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
        Already have an account?{' '}
        <Text as={Link} to="/login" color="orange.500">Log in</Text>
      </Text>
    </Box>
  );
}

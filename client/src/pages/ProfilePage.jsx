import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileSkeleton from '../components/profile/ProfileSkeleton';
import {
  Box, Heading, Text, Avatar, Flex, Button, FormControl,
  FormLabel, Input, Textarea, VStack, Divider, useToast,
} from '@chakra-ui/react';
import userService from '../services/userService';
import { useAuth } from '../context/AuthContext';
import RecipeGrid from '../components/recipe/RecipeGrid';
import Spinner from '../components/ui/Spinner';
import ErrorAlert from '../components/ui/ErrorAlert';

export default function ProfilePage() {
  const { id }      = useParams();
  const { user: me, login } = useAuth();
  const toast       = useToast();

  const [profile,   setProfile]   = useState(null);
  const [recipes,   setRecipes]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');
  const [editMode,  setEditMode]  = useState(false);
  const [form,      setForm]      = useState({ username: '', bio: '', avatarUrl: '' });
  const [saving,    setSaving]    = useState(false);

  const targetId = id || me?._id;
  const isOwner  = me && me._id === targetId;

  useEffect(() => {
    if (!targetId) return;
    userService.getProfile(targetId)
      .then(({ data }) => {
        setProfile(data.user);
        setRecipes(data.recipes);
        setForm({ username: data.user.username, bio: data.user.bio || '', avatarUrl: data.user.avatarUrl || '' });
      })
      .catch(() => setError('User not found.'))
      .finally(() => setLoading(false));
  }, [targetId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await userService.updateProfile(form);
      setProfile(data);
      setEditMode(false);
      toast({ title: 'Profile updated', status: 'success', duration: 2000 });
    } catch (err) {
      toast({ title: err.response?.data?.message || 'Update failed', status: 'error', duration: 2000 });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ProfileSkeleton />;
  if (error)   return <Box maxW="600px" mx="auto" mt={10}><ErrorAlert message={error} /></Box>;

  return (
    <Box maxW="1000px" mx="auto" px={6} py={10}>

      {/* Profile header */}
      <Flex gap={6} align="flex-start" mb={10} wrap="wrap">
        <Avatar size="xl" name={profile.username} src={profile.avatarUrl} />
        <Box flex={1}>
          <Heading size="lg">@{profile.username}</Heading>
          <Text color="gray.500" mt={1}>{profile.bio || 'No bio yet.'}</Text>
          <Text fontSize="sm" color="gray.400" mt={2}>
            {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} shared
          </Text>
          {isOwner && !editMode && (
            <Button size="sm" mt={3} variant="outline" onClick={() => setEditMode(true)}>
              Edit profile
            </Button>
          )}
        </Box>
      </Flex>

      {/* Edit form */}
      {isOwner && editMode && (
        <Box bg="gray.50" borderRadius="lg" p={6} mb={10}>
          <Heading size="sm" mb={4}>Edit profile</Heading>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                value={form.username}
                onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                bg="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea
                value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                rows={3}
                bg="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Avatar URL</FormLabel>
              <Input
                value={form.avatarUrl}
                onChange={(e) => setForm((p) => ({ ...p, avatarUrl: e.target.value }))}
                placeholder="https://..."
                bg="white"
              />
            </FormControl>
            <Flex gap={2}>
              <Button colorScheme="orange" isLoading={saving} onClick={handleSave}>Save</Button>
              <Button variant="ghost" onClick={() => setEditMode(false)}>Cancel</Button>
            </Flex>
          </VStack>
        </Box>
      )}

      <Divider mb={8} />

      {/* User's recipes */}
      <Heading size="md" mb={6}>
        {isOwner ? 'My recipes' : `Recipes by @${profile.username}`}
      </Heading>
      <RecipeGrid recipes={recipes} loading={loading} />
    </Box>
  );
}

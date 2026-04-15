import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, Button, Text, Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box as="nav" bg="white" borderBottom="1px" borderColor="gray.200" px={8} py={3}>
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">

        {/* Logo */}
        <Link to="/">
          <Text fontWeight="bold" fontSize="xl" color="orange.500">RecipeShare</Text>
        </Link>

        {/* Nav links */}
        <Flex gap={6} align="center">
          <Link to="/recipes"><Text fontSize="sm" color="gray.600" _hover={{ color: 'orange.500' }}>Browse</Text></Link>

          {user ? (
            <>
              <Link to="/favorites">
                <Text fontSize="sm" color="gray.600" _hover={{ color: 'orange.500' }}>Saved</Text>
              </Link>
              <Link to="/recipes/new">
                <Button size="sm" colorScheme="orange" variant="outline">Add Recipe</Button>
              </Link>

              {/* User menu */}
              <Menu>
                <MenuButton>
                  <Avatar size="sm" name={user.username} src={user.avatarUrl} />
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to={`/users/${user._id}`}>My Profile</MenuItem>
                  <MenuItem as={Link} to="/profile">Edit Profile</MenuItem>
                  <MenuItem onClick={handleLogout} color="red.500">Log Out</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Flex gap={2}>
              <Button as={Link} to="/login"    size="sm" variant="ghost">Log In</Button>
              <Button as={Link} to="/register" size="sm" colorScheme="orange">Sign Up</Button>
            </Flex>
          )}
        </Flex>

      </Flex>
    </Box>
  );
}

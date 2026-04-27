// Sticky top navigation bar. Shows different links depending on whether the user is logged in.
// Uses a Chakra UI Menu (dropdown) for the avatar-triggered user menu.
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Flex, Button, Text, Menu, MenuButton, MenuList,
  MenuItem, Avatar,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      as="nav"
      bg="white"
      borderBottom="1px"
      borderColor="gray.100"
      px={{ base: 4, md: 8 }}
      py={4}
      position="sticky"
      top={0}
      zIndex={100}
    >
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">

        {/* Logo */}
        <Link to="/">
          <Flex align="center">
            <img
              src="/nyama-logo.png"
              alt="Nyama"
              style={{ height: '28px', width: 'auto' }}
            />
          </Flex>
        </Link>

        {/* Nav links — logged in only */}
        {user && (
          <Flex gap={6} align="center" display={{ base: 'none', md: 'flex' }}>
            <Link to="/recipes">
              <Text fontSize="14px" color="gray.600" _hover={{ color: '#e34804' }}>
                Browse recipes
              </Text>
            </Link>
            <Link to="/grocery">
              <Text fontSize="14px" color="gray.600" _hover={{ color: '#e34804' }}>
                My list
              </Text>
            </Link>
            <Link to="/favorites">
              <Text fontSize="14px" color="gray.600" _hover={{ color: '#e34804' }}>
                Saved
              </Text>
            </Link>
          </Flex>
        )}

        {/* Right side */}
        <Flex gap={3} align="center">
          {user ? (
            <>
              <Button
                as={Link}
                to="/recipes/new"
                size="sm"
                bg="#e34804"
                color="white"
                borderRadius="full"
                px={4}
                _hover={{ bg: '#c0380a' }}
                leftIcon={<Text fontSize="14px">+</Text>}
              >
                New recipe
              </Button>

              <Menu>
                <MenuButton>
                  <Avatar
                    size="sm"
                    name={user.username}
                    src={user.avatarUrl}
                    bg="orange.100"
                    color="orange.800"
                    cursor="pointer"
                  />
                </MenuButton>
                <MenuList
                  fontSize="14px"
                  shadow="md"
                  border="1px"
                  borderColor="gray.100"
                  minW="200px"
                >
                  <Box px={3} py={2} borderBottom="1px" borderColor="gray.100">
                    <Text fontWeight="600" color="gray.800">
                      @{user.username}
                    </Text>
                    <Text fontSize="12px" color="gray.400">
                      {user.email}
                    </Text>
                  </Box>
                  <MenuItem
                    as={Link}
                    to={`/users/${user._id}`}
                    _hover={{ bg: 'gray.50' }}
                    color="gray.700"
                  >
                    My profile
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    to="/profile"
                    _hover={{ bg: 'gray.50' }}
                    color="gray.700"
                  >
                    Edit profile
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    to="/favorites"
                    _hover={{ bg: 'gray.50' }}
                    color="gray.700"
                  >
                    Saved recipes
                  </MenuItem>
                  <MenuItem
                    as={Link}
                    to="/grocery"
                    _hover={{ bg: 'gray.50' }}
                    color="gray.700"
                  >
                    My grocery list
                  </MenuItem>
                  <Box borderTop="1px" borderColor="gray.100" mt={1}>
                    <MenuItem
                      onClick={handleLogout}
                      color="red.500"
                      _hover={{ bg: 'red.50' }}
                      mt={1}
                    >
                      Log out
                    </MenuItem>
                  </Box>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Flex gap={2}>
              <Button
                as={Link}
                to="/login"
                size="sm"
                variant="ghost"
                color="gray.600"
                _hover={{ bg: 'gray.100' }}
              >
                Log in
              </Button>
              <Button
                as={Link}
                to="/register"
                size="sm"
                bg="#e34804"
                color="white"
                borderRadius="full"
                _hover={{ bg: '#c0380a' }}
              >
                Sign up
              </Button>
            </Flex>
          )}
        </Flex>

      </Flex>
    </Box>
  );
}


// Grocery list page. Lets the user generate a shopping list from their saved recipes,
// toggle items as checked, clear completed items, reset all checks, or print the list.
// Items are grouped by store section (Produce, Protein, Dairy, Pantry, Other) for easier shopping.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Flex, Heading, Text, Button, Spinner,
} from '@chakra-ui/react';
import groceryService from '../services/groceryService';
import ErrorAlert from '../components/ui/ErrorAlert';

const SECTION_ORDER = ['Produce', 'Protein', 'Dairy', 'Pantry', 'Other'];

const SECTION_ICONS = {
  Produce: '🥦',
  Protein: '🥩',
  Dairy:   '🧀',
  Pantry:  '🫙',
  Other:   '🛒',
};

export default function GroceryPage() {
  const [items,      setItems]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error,      setError]      = useState('');

  useEffect(() => {
    groceryService.getList()
      .then(res => setItems(res.data))
      .catch(() => setError('Could not load your grocery list.'))
      .finally(() => setLoading(false));
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    try {
      const { data } = await groceryService.generate();
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not generate list.');
    } finally {
      setGenerating(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await groceryService.toggleItem(id);
      setItems(prev => prev.map(i => i._id === id ? data : i));
    } catch {
      setError('Could not update item.');
    }
  };

  const handleClearCompleted = async () => {
    try {
      const { data } = await groceryService.clearCompleted();
      setItems(data);
    } catch {
      setError('Could not clear completed items.');
    }
  };

  const handleReset = async () => {
    try {
      const { data } = await groceryService.resetList();
      setItems(data);
    } catch {
      setError('Could not reset list.');
    }
  };

  const grouped = SECTION_ORDER.reduce((acc, section) => {
    const sectionItems = items.filter(i => i.section === section);
    if (sectionItems.length) acc[section] = sectionItems;
    return acc;
  }, {});

  const checkedCount   = items.filter(i => i.checked).length;
  const uncheckedCount = items.filter(i => !i.checked).length;

  return (
    <Box display="flex" flexDirection="column">
      <Box flex={1} maxW="900px" mx="auto" px={{ base: 4, md: 8 }} py={10} w="full">

        {/* Header */}
        <Flex justify="space-between" align="flex-start" mb={8} wrap="wrap" gap={4}>
          <Box>
            <Heading size="xl" fontWeight="700" color="gray.900" mb={2}>
              My grocery list
            </Heading>
            <Text fontSize="14px" color="gray.400">
              {items.length === 0
                ? 'Save recipes then generate your list'
                : `${uncheckedCount} items remaining · ${checkedCount} done`}
            </Text>
          </Box>

          <Flex gap={3} wrap="wrap" className="no-print">
            {checkedCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                borderColor="gray.200"
                color="gray.500"
                onClick={handleClearCompleted}
                _hover={{ bg: 'gray.50' }}
              >
                Clear completed
              </Button>
            )}
            {items.length > 0 && checkedCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                borderColor="gray.200"
                color="gray.500"
                onClick={handleReset}
                _hover={{ bg: 'gray.50' }}
              >
                Reset all
              </Button>
            )}
            {items.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                borderColor="gray.200"
                color="gray.500"
                onClick={() => window.print()}
                _hover={{ bg: 'gray.50' }}
                leftIcon={
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 5V1h8v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <rect x="1" y="5" width="12" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M3 8h8M3 11h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                }
              >
                Print list
              </Button>
            )}
            <Button
              size="sm"
              bg="#E8440A"
              color="white"
              borderRadius="full"
              px={5}
              isLoading={generating}
              loadingText="Generating..."
              onClick={handleGenerate}
              _hover={{ bg: '#C0380A' }}
            >
              Generate from saved recipes
            </Button>
          </Flex>
        </Flex>

        <ErrorAlert message={error} onClose={() => setError('')} />

        {/* Loading */}
        {loading && (
          <Flex justify="center" py={20}>
            <Spinner size="lg" color="orange.500" />
          </Flex>
        )}

        {/* Empty state */}
        {!loading && items.length === 0 && (
          <Box
            textAlign="center"
            py={20}
            border="1px"
            borderColor="gray.100"
            borderRadius="xl"
            bg="gray.50"
          >
            <Text fontSize="48px" mb={4}>🛒</Text>
            <Heading size="md" fontWeight="600" mb={2} color="gray.700">
              Your grocery list is empty
            </Heading>
            <Text fontSize="14px" color="gray.400" mb={6} maxW="320px" mx="auto">
              Save some recipes first, then hit "Generate from saved recipes" to build your list.
            </Text>
            <Button
              as={Link}
              to="/recipes"
              bg="#E8440A"
              color="white"
              borderRadius="full"
              px={6}
              _hover={{ bg: '#C0380A' }}
            >
              Browse recipes
            </Button>
          </Box>
        )}

        {/* Progress bar */}
        {items.length > 0 && (
          <Box mb={8} className="no-print">
            <Flex justify="space-between" mb={2}>
              <Text fontSize="12px" color="gray.400">
                {checkedCount} of {items.length} items checked
              </Text>
              <Text fontSize="12px" color="gray.400">
                {Math.round((checkedCount / items.length) * 100)}%
              </Text>
            </Flex>
            <Box bg="gray.100" borderRadius="full" h="6px">
              <Box
                bg="#E8440A"
                borderRadius="full"
                h="6px"
                w={`${(checkedCount / items.length) * 100}%`}
                transition="width 0.3s ease"
              />
            </Box>
          </Box>
        )}

        {/* Grouped items */}
        {!loading && Object.entries(grouped).map(([section, sectionItems]) => (
          <Box key={section} mb={8} className="grocery-section">

            {/* Section header */}
            <Flex
              align="center"
              gap={2}
              mb={4}
              pb={2}
              borderBottom="1px"
              borderColor="gray.100"
              className="section-header"
            >
              <Text fontSize="16px">{SECTION_ICONS[section]}</Text>
              <Text fontWeight="600" fontSize="14px" color="gray.700">
                {section}
              </Text>
              <Text fontSize="12px" color="gray.400">
                ({sectionItems.filter(i => !i.checked).length} remaining)
              </Text>
            </Flex>

            {/* Items */}
            <Box>
              {sectionItems.map(item => (
                <Flex
                  key={item._id}
                  align="center"
                  gap={4}
                  py={3}
                  px={4}
                  mb={2}
                  bg={item.checked ? 'gray.50' : 'white'}
                  border="1px"
                  borderColor="gray.100"
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => handleToggle(item._id)}
                  transition="all 0.15s"
                  _hover={{ borderColor: '#E8440A' }}
                  className="grocery-item"
                >
                  {/* Checkbox */}
                  <Box
                    w="20px" h="20px"
                    borderRadius="5px"
                    border="1.5px"
                    borderColor={item.checked ? '#E8440A' : 'gray.300'}
                    bg={item.checked ? '#E8440A' : 'white'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    transition="all 0.15s"
                  >
                    {item.checked && (
                      <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                        <path
                          d="M1 4l3 3 5-6"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Box>

                  {/* Name + recipe source */}
                  <Box flex={1}>
                    <Text
                      fontSize="14px"
                      fontWeight="500"
                      color={item.checked ? 'gray.400' : 'gray.800'}
                      textDecoration={item.checked ? 'line-through' : 'none'}
                    >
                      {item.name}
                    </Text>
                    <Text fontSize="12px" color="gray.400">
                      from {item.recipe}
                    </Text>
                  </Box>

                  {/* Quantity */}
                  <Text
                    fontSize="13px"
                    color={item.checked ? 'gray.300' : 'gray.500'}
                    fontWeight="500"
                    flexShrink={0}
                  >
                    {item.quantity}
                  </Text>
                </Flex>
              ))}
            </Box>
          </Box>
        ))}

      </Box>
    </Box>
  );
}

import { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, FormErrorMessage,
  Input, Textarea, Select, SimpleGrid, NumberInput,
  NumberInputField, HStack, IconButton, VStack, Text, Divider,
} from '@chakra-ui/react';
import ErrorAlert from '../ui/ErrorAlert';

const CATEGORIES = [
  'Beef','Chicken','Dessert','Lamb','Miscellaneous',
  'Pasta','Pork','Seafood','Side','Starter',
  'Vegan','Vegetarian','Breakfast','Goat',
];

const emptyIngredient = { name: '', quantity: '' };

export default function RecipeForm({ initialValues = {}, onSubmit, isLoading }) {
  const [form, setForm] = useState({
    title:        initialValues.title        || '',
    description:  initialValues.description  || '',
    instructions: initialValues.instructions || '',
    category:     initialValues.category     || '',
    area:         initialValues.area         || '',
    imageUrl:     initialValues.imageUrl     || '',
    prepTime:     initialValues.prepTime     || 0,
    cookTime:     initialValues.cookTime     || 0,
    servings:     initialValues.servings     || 2,
    difficulty:   initialValues.difficulty   || 'Medium',
    tags:         initialValues.tags?.join(', ') || '',
    ingredients:  initialValues.ingredients?.length
      ? initialValues.ingredients
      : [{ ...emptyIngredient }],
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const setIngredient = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.ingredients];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, ingredients: updated };
    });
  };

  const addIngredient    = () => setForm((p) => ({ ...p, ingredients: [...p.ingredients, { ...emptyIngredient }] }));
  const removeIngredient = (i) => setForm((p) => ({ ...p, ingredients: p.ingredients.filter((_, idx) => idx !== i) }));

  const validate = () => {
    const e = {};
    if (!form.title.trim())        e.title        = 'Title is required';
    if (!form.description.trim())  e.description  = 'Description is required';
    if (!form.instructions.trim()) e.instructions = 'Instructions are required';
    if (!form.category)            e.category     = 'Category is required';
    if (form.ingredients.some((ing) => !ing.name.trim() || !ing.quantity.trim())) {
      e.ingredients = 'All ingredient fields must be filled in';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setServerError('');
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        prepTime: Number(form.prepTime),
        cookTime: Number(form.cookTime),
        servings: Number(form.servings),
      };
      await onSubmit(payload);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} noValidate>
      <ErrorAlert message={serverError} />

      <VStack spacing={5} align="stretch">
        {/* Title */}
        <FormControl isInvalid={!!errors.title} isRequired>
          <FormLabel>Title</FormLabel>
          <Input value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Spaghetti Bolognese" />
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>

        {/* Description */}
        <FormControl isInvalid={!!errors.description} isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} placeholder="Short summary of the dish" />
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        </FormControl>

        {/* Category + Difficulty */}
        <SimpleGrid columns={2} spacing={4}>
          <FormControl isInvalid={!!errors.category} isRequired>
            <FormLabel>Category</FormLabel>
            <Select value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Select category">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
            <FormErrorMessage>{errors.category}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Difficulty</FormLabel>
            <Select value={form.difficulty} onChange={(e) => set('difficulty', e.target.value)}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Select>
          </FormControl>
        </SimpleGrid>

        {/* Times + Servings */}
        <SimpleGrid columns={3} spacing={4}>
          <FormControl>
            <FormLabel>Prep time (min)</FormLabel>
            <NumberInput min={0} value={form.prepTime} onChange={(val) => set('prepTime', val)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Cook time (min)</FormLabel>
            <NumberInput min={0} value={form.cookTime} onChange={(val) => set('cookTime', val)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Servings</FormLabel>
            <NumberInput min={1} value={form.servings} onChange={(val) => set('servings', val)}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </SimpleGrid>

        {/* Area + Image URL */}
        <SimpleGrid columns={2} spacing={4}>
          <FormControl>
            <FormLabel>Cuisine / Area</FormLabel>
            <Input value={form.area} onChange={(e) => set('area', e.target.value)} placeholder="e.g. Italian" />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input value={form.imageUrl} onChange={(e) => set('imageUrl', e.target.value)} placeholder="https://..." type="url" />
          </FormControl>
        </SimpleGrid>

        <Divider />

        {/* Ingredients */}
        <Box>
          <Text fontWeight="medium" mb={3}>Ingredients</Text>
          {errors.ingredients && <Text color="red.500" fontSize="sm" mb={2}>{errors.ingredients}</Text>}
          <VStack spacing={2} align="stretch">
            {form.ingredients.map((ing, i) => (
              <HStack key={i}>
                <Input
                  placeholder="Ingredient name"
                  value={ing.name}
                  onChange={(e) => setIngredient(i, 'name', e.target.value)}
                />
                <Input
                  placeholder="Quantity e.g. 2 cups"
                  value={ing.quantity}
                  onChange={(e) => setIngredient(i, 'quantity', e.target.value)}
                  maxW="180px"
                />
                <IconButton
                  aria-label="Remove ingredient"
                  icon={<span>✕</span>}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  isDisabled={form.ingredients.length === 1}
                  onClick={() => removeIngredient(i)}
                />
              </HStack>
            ))}
          </VStack>
          <Button size="sm" variant="outline" mt={3} onClick={addIngredient}>
            + Add ingredient
          </Button>
        </Box>

        <Divider />

        {/* Instructions */}
        <FormControl isInvalid={!!errors.instructions} isRequired>
          <FormLabel>Instructions</FormLabel>
          <Textarea
            value={form.instructions}
            onChange={(e) => set('instructions', e.target.value)}
            rows={8}
            placeholder="Step-by-step cooking instructions..."
          />
          <FormErrorMessage>{errors.instructions}</FormErrorMessage>
        </FormControl>

        {/* Tags */}
        <FormControl>
          <FormLabel>Tags</FormLabel>
          <Input
            value={form.tags}
            onChange={(e) => set('tags', e.target.value)}
            placeholder="Comma-separated e.g. quick, healthy, gluten-free"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="orange"
          size="lg"
          isLoading={isLoading}
          loadingText="Saving..."
        >
          Save Recipe
        </Button>
      </VStack>
    </Box>
  );
}

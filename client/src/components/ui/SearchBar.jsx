import { useState } from 'react';
import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

export default function SearchBar({ value, onChange, onClear, placeholder = 'Search recipes...' }) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.400" boxSize={4} />
      </InputLeftElement>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        bg="white"
        borderColor="gray.300"
        _focus={{ borderColor: 'orange.400', boxShadow: '0 0 0 1px orange' }}
      />
      {value && (
        <InputRightElement>
          <IconButton
            aria-label="Clear search"
            icon={<CloseIcon boxSize={2.5} />}
            size="xs"
            variant="ghost"
            onClick={onClear}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}

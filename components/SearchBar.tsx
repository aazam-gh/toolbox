import { Input } from "@/components/ui/input";
import React from 'react';

interface SearchBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
}

export function SearchBar({ searchText, onSearchChange }: SearchBarProps) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className='w-1/2'>
      <Input
        type="text"
        placeholder="Search for a type of Product"
        value={searchText}
        onChange={handleSearchChange}
      />
    </div>
  );
}

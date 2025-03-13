
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from './input';
import { Button } from './button';
import { Search } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for furniture, electronics, clothing and more..."
          className="pl-10 pr-16 py-6 text-base rounded-full shadow-sm focus:shadow-md transition-shadow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
        <Button 
          type="submit" 
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full px-4 py-2"
          disabled={!searchQuery.trim()}
        >
          Search
        </Button>
      </div>
    </form>
  );
};

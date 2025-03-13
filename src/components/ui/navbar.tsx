
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './button';
import { Input } from './input';
import {
  Search,
  Menu,
  X,
  Plus,
  User,
  Bell,
  MessageSquare,
  Heart,
  LogIn
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'glass shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold tracking-tight">ThriftMate</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-sm font-medium button-hover">
              Browse
            </Link>
            <Link to="/categories" className="text-sm font-medium button-hover">
              Categories
            </Link>
            <Link to="/how-it-works" className="text-sm font-medium button-hover">
              How It Works
            </Link>
          </nav>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative max-w-sm flex-1 mx-4">
            <Input
              type="search"
              placeholder="Search for items..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={18} className="absolute left-3 text-muted-foreground" />
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="icon" asChild className="hover:bg-accent">
              <Link to="/favorites" aria-label="Favorites">
                <Heart size={20} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-accent">
              <Link to="/messages" aria-label="Messages">
                <MessageSquare size={20} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hover:bg-accent">
              <Link to="/notifications" aria-label="Notifications">
                <Bell size={20} />
              </Link>
            </Button>
            <Button asChild>
              <Link to="/post">
                <Plus size={18} className="mr-2" />
                <span>Sell</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link to="/login" aria-label="Login">
                <LogIn size={20} />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="border-t border-border px-4 py-5 space-y-5">
            <form onSubmit={handleSearchSubmit} className="flex items-center relative">
              <Input
                type="search"
                placeholder="Search for items..."
                className="pl-10 pr-4 py-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute left-3 text-muted-foreground" />
            </form>
            
            <nav className="flex flex-col space-y-4">
              <Link to="/browse" className="text-sm font-medium py-2">
                Browse
              </Link>
              <Link to="/categories" className="text-sm font-medium py-2">
                Categories
              </Link>
              <Link to="/how-it-works" className="text-sm font-medium py-2">
                How It Works
              </Link>
              <Link to="/favorites" className="text-sm font-medium py-2 flex items-center">
                <Heart size={18} className="mr-2" />
                Favorites
              </Link>
              <Link to="/messages" className="text-sm font-medium py-2 flex items-center">
                <MessageSquare size={18} className="mr-2" />
                Messages
              </Link>
              <Link to="/notifications" className="text-sm font-medium py-2 flex items-center">
                <Bell size={18} className="mr-2" />
                Notifications
              </Link>
            </nav>
            
            <div className="flex flex-col space-y-3 pt-3 border-t border-border">
              <Button asChild>
                <Link to="/post" className="w-full justify-center">
                  <Plus size={18} className="mr-2" />
                  <span>Sell an Item</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-center">
                <Link to="/login">
                  <LogIn size={18} className="mr-2" />
                  <span>Login / Sign Up</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

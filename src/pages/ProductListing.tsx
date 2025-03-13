
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Navbar } from '../components/ui/navbar';
import { Footer } from '../components/ui/footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown,
  Tag,
  MapPin,
  Check
} from 'lucide-react';
import { ProductCard } from '../components/ui/product-card';
import { getProductsByCategory, products as allProducts } from '../data/products';
import { categories } from '../data/categories';
import { Product } from '../types/product';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const ProductListing = () => {
  const location = useLocation();
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number | null }>({ min: 0, max: null });
  const [conditionFilter, setConditionFilter] = useState<string[]>([]);

  useEffect(() => {
    // Initialize products based on URL (category or all)
    let initialProducts: Product[];
    
    if (category) {
      initialProducts = getProductsByCategory(category);
      setSelectedCategory(category);
    } else {
      initialProducts = [...allProducts];
    }
    
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
    setIsLoading(false);
  }, [category, location]);

  useEffect(() => {
    // Apply filters and search whenever they change
    let results = [...products];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    // Apply condition filter
    if (conditionFilter.length > 0) {
      results = results.filter(product => conditionFilter.includes(product.condition));
    }
    
    // Apply price range filter
    results = results.filter(product => {
      const aboveMin = priceRange.min ? product.price >= priceRange.min : true;
      const belowMax = priceRange.max ? product.price <= priceRange.max : true;
      return aboveMin && belowMax;
    });
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, sortBy, products, priceRange, conditionFilter]);

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const toggleConditionFilter = (condition: string) => {
    setConditionFilter(prev => 
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  const getCategoryName = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : 'All Categories';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-muted py-8">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {selectedCategory ? getCategoryName(selectedCategory) : 'All Items'}
            </h1>
            <p className="text-muted-foreground mb-6">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Input
                  type="search"
                  placeholder="Search within results..."
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <Tag size={16} className="mr-2" />
                      Category
                      <ChevronDown size={16} className="ml-2 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem 
                        onClick={() => handleCategoryChange(null)}
                        className="flex items-center justify-between"
                      >
                        All Categories
                        {selectedCategory === null && <Check size={16} />}
                      </DropdownMenuItem>
                      {categories.map(category => (
                        <DropdownMenuItem 
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className="flex items-center justify-between"
                        >
                          {category.name}
                          {selectedCategory === category.id && <Check size={16} />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <SlidersHorizontal size={16} className="mr-2" />
                      Sort
                      <ChevronDown size={16} className="ml-2 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem 
                        onClick={() => handleSortChange('newest')}
                        className="flex items-center justify-between"
                      >
                        Newest first
                        {sortBy === 'newest' && <Check size={16} />}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleSortChange('price-asc')}
                        className="flex items-center justify-between"
                      >
                        Price: Low to High
                        {sortBy === 'price-asc' && <Check size={16} />}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleSortChange('price-desc')}
                        className="flex items-center justify-between"
                      >
                        Price: High to Low
                        {sortBy === 'price-desc' && <Check size={16} />}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 sm:flex-none">
                      <MapPin size={16} className="mr-2" />
                      Filters
                      <ChevronDown size={16} className="ml-2 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 p-4" forceMount>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Condition</h3>
                        <div className="space-y-2">
                          {['new', 'like new', 'good', 'fair', 'poor'].map(condition => (
                            <div key={condition} className="flex items-center">
                              <button
                                onClick={() => toggleConditionFilter(condition)}
                                className={`w-4 h-4 mr-2 flex items-center justify-center rounded border ${
                                  conditionFilter.includes(condition) 
                                    ? 'bg-primary border-primary' 
                                    : 'border-input'
                                }`}
                              >
                                {conditionFilter.includes(condition) && <Check size={12} className="text-primary-foreground" />}
                              </button>
                              <span className="capitalize">{condition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Price Range</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Input
                              type="number"
                              placeholder="Min"
                              value={priceRange.min || ''}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value ? Number(e.target.value) : 0 }))}
                              className="w-full"
                              min={0}
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              placeholder="Max"
                              value={priceRange.max || ''}
                              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value ? Number(e.target.value) : null }))}
                              className="w-full"
                              min={0}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={() => {
                          setConditionFilter([]);
                          setPriceRange({ min: 0, max: null });
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No items found</h2>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setConditionFilter([]);
                  setPriceRange({ min: 0, max: null });
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductListing;

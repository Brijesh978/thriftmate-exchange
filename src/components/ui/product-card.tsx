
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Badge } from './badge';
import { Card, CardContent, CardFooter } from './card';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'like new':
        return 'bg-teal-100 text-teal-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-amber-100 text-amber-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <Card className="product-card h-full overflow-hidden border border-border hover:border-primary/20">
        <div className="relative image-hover aspect-[4/3] overflow-hidden bg-muted">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
              <span className="sr-only">Loading</span>
            </div>
          )}
          <img
            src={product.images[0]}
            alt={product.title}
            className={`object-cover w-full h-full smooth-transition ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white smooth-transition"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={18}
              className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"}
            />
          </button>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-base line-clamp-1">{product.title}</h3>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
            <Badge variant="outline" className={`${getConditionColor(product.condition)} capitalize text-xs`}>
              {product.condition}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between">
          <span>{product.location}</span>
          <span>{formatDate(product.createdAt)}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};


import React from 'react';
import { ProductCard } from './product-card';
import { getFeaturedProducts, getLatestProducts } from '../../data/products';

interface FeaturedProductsProps {
  title: string;
  description?: string;
  type: 'featured' | 'latest';
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  description,
  type
}) => {
  const products = type === 'featured' ? getFeaturedProducts() : getLatestProducts(6);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground max-w-lg mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

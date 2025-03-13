
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Browse Categories</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Find exactly what you're looking for from our curated categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className="group flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden image-hover mb-3 border border-border shadow-sm">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
              </div>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

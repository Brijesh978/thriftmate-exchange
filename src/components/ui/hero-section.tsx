
import React from 'react';
import { Button } from './button';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-slide-up">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Buy and Sell with <span className="text-primary">Confidence</span>
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                A simpler way to find pre-loved treasures and give your items a second life.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/browse">Browse Items</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/post">Start Selling</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by over 10,000 sellers and buyers across the country.
            </p>
          </div>
          
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 grid grid-cols-2 gap-4 animate-slide-down md:delay-150">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg h-[120px] md:h-[180px] bg-muted shadow-lg relative top-8 image-hover">
                  <img 
                    src="https://images.unsplash.com/photo-1623756598439-219a38b75d3d?q=80&w=500&auto=format&fit=crop" 
                    alt="Vintage camera" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg h-[140px] md:h-[200px] bg-muted shadow-lg image-hover">
                  <img 
                    src="https://images.unsplash.com/photo-1601379760883-1bb483e747cf?q=80&w=500&auto=format&fit=crop" 
                    alt="Leather jacket" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-10">
                <div className="overflow-hidden rounded-lg h-[140px] md:h-[200px] bg-muted shadow-lg image-hover">
                  <img 
                    src="https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=500&auto=format&fit=crop" 
                    alt="Modern furniture" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-lg h-[120px] md:h-[180px] bg-muted shadow-lg image-hover">
                  <img 
                    src="https://images.unsplash.com/photo-1523450001312-faa4e2e37f0f?q=80&w=500&auto=format&fit=crop" 
                    alt="Bicycle" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

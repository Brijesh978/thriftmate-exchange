
import React from 'react';
import { Navbar } from '../components/ui/navbar';
import { HeroSection } from '../components/ui/hero-section';
import { CategorySection } from '../components/ui/category-section';
import { FeaturedProducts } from '../components/ui/featured-products';
import { SearchBar } from '../components/ui/search-bar';
import { Footer } from '../components/ui/footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8 space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Find What You're Looking For</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Search for items by keyword, category, or location
              </p>
            </div>
            <SearchBar />
          </div>
        </section>
        
        <CategorySection />
        
        <FeaturedProducts 
          title="Featured Items"
          description="Handpicked items that you might love"
          type="featured"
        />
        
        <FeaturedProducts 
          title="Latest Arrivals"
          description="Fresh finds added every day"
          type="latest"
        />
        
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                Ready to give your items a second life?
              </h2>
              <p className="text-primary-foreground/80">
                Join thousands of sellers who have successfully found new homes for their pre-loved treasures.
              </p>
              <a href="/post" className="inline-block bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
                Start Selling
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

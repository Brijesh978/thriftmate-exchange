
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block font-bold text-xl mb-4">ThriftMate</Link>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              A marketplace for pre-loved items, making sustainable shopping simple and accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Browse All</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Categories</Link></li>
              <li><Link to="/deals" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Deals</Link></li>
              <li><Link to="/trending" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Trending</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Sell</h3>
            <ul className="space-y-2">
              <li><Link to="/post" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Start Selling</Link></li>
              <li><Link to="/seller-guide" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Seller Guide</Link></li>
              <li><Link to="/seller-tools" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Tools</Link></li>
              <li><Link to="/success-stories" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Shipping</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Returns</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ThriftMate. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/ui/navbar';
import { Footer } from '../components/ui/footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Heart, 
  Share2, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  User,
  Calendar
} from 'lucide-react';
import { getProductById, getLatestProducts } from '../data/products';
import { Product } from '../types/product';
import { ProductCard } from '../components/ui/product-card';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Get related products from the same category
        const related = getLatestProducts(6).filter(p => 
          p.id !== foundProduct.id && p.category === foundProduct.category
        ).slice(0, 3);
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
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
      year: 'numeric',
      month: 'long',
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <Link to="/browse" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft size={16} className="mr-1" />
              Back to Browsing
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                <img
                  src={product.images[activeImage]}
                  alt={product.title}
                  className="object-cover w-full h-full animate-fade-in"
                />
                
                {product.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
                      onClick={handlePrevImage}
                    >
                      <ChevronLeft size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
                      onClick={handleNextImage}
                    >
                      <ChevronRight size={20} />
                    </Button>
                  </>
                )}
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden ${
                        activeImage === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`${getConditionColor(product.condition)} uppercase text-xs`}>
                    {product.condition}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="hover:bg-accent"
                    >
                      <Heart
                        size={20}
                        className={isFavorite ? "text-red-500 fill-red-500" : ""}
                      />
                    </Button>
                    <Button variant="ghost" size="icon" className="hover:bg-accent">
                      <Share2 size={20} />
                    </Button>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.seller.rating) ? "fill-current" : ""}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.seller.rating} ({Math.floor(Math.random() * 50) + 10} reviews)
                  </span>
                </div>
                
                <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={16} className="mr-1" />
                  <span>{product.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock size={16} className="mr-1" />
                  <span>Posted on {formatDate(product.createdAt)}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="font-medium">Description</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="border-t border-border pt-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <User size={24} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.seller.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar size={14} className="mr-1" />
                      <span>Member since {new Date(product.seller.joinedDate).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="sm:flex-1" size="lg">
                  <MessageSquare size={18} className="mr-2" />
                  Message Seller
                </Button>
                <Button variant="outline" className="sm:flex-1" size="lg">
                  Make Offer
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;

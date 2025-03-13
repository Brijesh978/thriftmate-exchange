
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  condition: 'new' | 'like new' | 'good' | 'fair' | 'poor';
  category: string;
  location: string;
  seller: {
    id: string;
    name: string;
    rating: number;
    joinedDate: string;
  };
  images: string[];
  createdAt: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

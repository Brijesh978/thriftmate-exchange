
import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    title: 'Apple iPhone 13 Pro - Mint Condition',
    price: 699.99,
    description: 'Barely used iPhone 13 Pro 128GB in Sierra Blue. Includes original box, charger, and AppleCare+ until December 2023. Minor scratches on the back glass, otherwise perfect condition. Battery health at 96%.',
    condition: 'like new',
    category: 'electronics',
    location: 'San Francisco, CA',
    seller: {
      id: 'u1',
      name: 'Alex Johnson',
      rating: 4.8,
      joinedDate: '2020-05-15T00:00:00Z',
    },
    images: [
      'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=1000&auto=format&fit=crop',
    ],
    createdAt: '2023-11-05T14:22:10Z',
    featured: true
  },
  {
    id: '2',
    title: 'Mid-Century Modern Coffee Table',
    price: 249.50,
    description: 'Beautiful mid-century modern coffee table in walnut finish. Dimensions: 48" x 24" x 18". Some minor scratches on the surface, but overall in great condition. Non-smoking household. Local pickup only.',
    condition: 'good',
    category: 'furniture',
    location: 'Portland, OR',
    seller: {
      id: 'u2',
      name: 'Emma Wilson',
      rating: 4.9,
      joinedDate: '2021-02-10T00:00:00Z',
    },
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594041680539-cc6aa9b40b10?q=80&w=1000&auto=format&fit=crop',
    ],
    createdAt: '2023-11-01T09:15:22Z',
    featured: true
  },
  {
    id: '3',
    title: 'Sony WH-1000XM4 Wireless Headphones',
    price: 189.99,
    description: 'Sony WH-1000XM4 noise cancelling headphones in black. Purchased 8 months ago, works perfectly. Comes with original case, cables, and manuals. Great battery life and sound quality.',
    condition: 'like new',
    category: 'electronics',
    location: 'Chicago, IL',
    seller: {
      id: 'u3',
      name: 'Marcus Green',
      rating: 4.7,
      joinedDate: '2019-11-20T00:00:00Z',
    },
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop',
    ],
    createdAt: '2023-10-28T16:42:05Z',
  },
  {
    id: '4',
    title: 'Vintage Leather Jacket',
    price: 125.00,
    description: 'Genuine leather bomber jacket from the 90s. Size Medium. Beautiful patina and very comfortable. Lining is in perfect condition. Selling because it\'s too small for me now.',
    condition: 'good',
    category: 'clothing',
    location: 'Austin, TX',
    seller: {
      id: 'u4',
      name: 'Sophia Rodriguez',
      rating: 4.6,
      joinedDate: '2020-09-05T00:00:00Z',
    },
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    ],
    createdAt: '2023-10-25T11:33:50Z',
    featured: true
  },
  {
    id: '5',
    title: 'Canon EOS 5D Mark IV DSLR Camera',
    price: 1599.00,
    description: 'Canon EOS 5D Mark IV with 24-70mm f/2.8L lens. Shutter count is approximately 15,000. Includes extra battery, memory cards, and camera bag. No visible wear or damage, works perfectly.',
    condition: 'like new',
    category: 'electronics',
    location: 'Seattle, WA',
    seller: {
      id: 'u5',
      name: 'David Kim',
      rating: 5.0,
      joinedDate: '2018-07-12T00:00:00Z',
    },
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588372405219-e40d64efafcb?q=80&w=1000&auto=format&fit=crop',
    ],
    createdAt: '2023-10-20T08:19:37Z',
  },
  {
    id: '6',
    title: 'Trek FX 3 Hybrid Bike',
    price: 450.00,
    description: 'Trek FX 3 Disc hybrid bike, size Medium (17.5"). 2022 model in excellent condition. Hydraulic disc brakes, Shimano components. Recently tuned up and ready to ride. Selling because I upgraded to a road bike.',
    condition: 'good',
    category: 'sports',
    location: 'Denver, CO',
    seller: {
      id: 'u6',
      name: 'Chris Taylor',
      rating: 4.9,
      joinedDate: '2019-04-30T00:00:00Z',
    },
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571333250630-f0369694accd?q=80&w=1000&auto=format&fit=crop',
    ],
    createdAt: '2023-10-18T15:09:12Z',
    featured: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getLatestProducts = (limit: number = 10): Product[] => {
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

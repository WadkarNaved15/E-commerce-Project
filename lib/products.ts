export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Earings' | 'Rings' | 'Necklace';
  description: string;
  features: string[];
  images: string[];
  sizes: string[];
  rating: number;
  popularity: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Diamond Stud Earrings',
    price: 280,
    category: 'Earings',
    description: 'Classic diamond stud earrings for timeless elegance.',
    features: ['Genuine diamonds', '18k gold', 'Hypoallergenic', 'Luxury gift box included'],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    ],
    sizes: ['One Size'],
    rating: 4.9,
    popularity: 90,
  },
  {
    id: 2,
    name: 'Gold Ring Set',
    price: 520,
    category: 'Rings',
    description: 'Elegant stackable gold rings set for all occasions.',
    features: ['14k gold', 'Adjustable sizes', 'Handcrafted', 'Polished finish'],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80',
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    rating: 4.8,
    popularity: 85,
  },
  {
    id: 3,
    name: 'Pearl Necklace',
    price: 680,
    category: 'Necklace',
    description: 'Elegant South Sea pearl necklace with gold clasp.',
    features: ['South Sea pearls', '18k gold clasp', 'Adjustable length', 'Luxury packaging'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      'https://images.unsplash.com/photo-1584274292540-e79f53877dfb?w=800&q=80',
    ],
    sizes: ['One Size'],
    rating: 5.0,
    popularity: 95,
  },
  {
    id: 4,
    name: 'Silver Hoop Earrings',
    price: 150,
    category: 'Earings',
    description: 'Classic silver hoop earrings for everyday elegance.',
    features: ['Sterling silver', 'Lightweight', 'Hypoallergenic', 'Polished finish'],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
    ],
    sizes: ['One Size'],
    rating: 4.7,
    popularity: 80,
  },
  {
    id: 5,
    name: 'Gold Chain Necklace',
    price: 450,
    category: 'Necklace',
    description: 'Delicate gold chain necklace, perfect for layering.',
    features: ['14k gold', 'Adjustable length', 'Polished finish', 'Lightweight'],
    images: [
      'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&q=80',
    ],
    sizes: ['One Size'],
    rating: 4.8,
    popularity: 75,
  },
  {
    id: 6,
    name: 'Emerald Cocktail Ring',
    price: 750,
    category: 'Rings',
    description: 'Statement emerald ring with intricate gold setting.',
    features: ['Emerald gemstone', '18k gold', 'Adjustable', 'Luxury packaging'],
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    ],
    sizes: ['6', '7', '8', '9', '10', '11'],
    rating: 4.9,
    popularity: 90,
  },
];

export const getProductById = (id: number): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductsByCategory = (category: string): Product[] =>
  category === 'All' ? products : products.filter((p) => p.category === category);

export const filterProducts = (
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  sizes?: string[]
): Product[] => {
  return products.filter((product) => {
    if (category && category !== 'All' && product.category !== category) return false;
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    if (sizes && sizes.length > 0 && !product.sizes.some((s) => sizes.includes(s)))
      return false;
    return true;
  });
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'popularity':
      return sorted.sort((a, b) => b.popularity - a.popularity);
    default:
      return sorted;
  }
};

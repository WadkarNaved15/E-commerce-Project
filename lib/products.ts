export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Dresses' | 'Accessories' | 'Shoes';
  description: string;
  features: string[];
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  popularity: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Silk Evening Gown',
    price: 850,
    category: 'Dresses',
    description: 'Luxurious silk evening gown with hand-embroidered details. Perfect for gala events and special occasions.',
    features: [
      '100% pure mulberry silk',
      'Hand-embroidered neckline',
      'Italian craftsmanship',
      'Dry clean only'
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy', hex: '#001F3F' },
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Black', hex: '#000000' }
    ],
    rating: 4.8,
    popularity: 95
  },
  {
    id: 2,
    name: 'Diamond Clutch Bag',
    price: 450,
    category: 'Accessories',
    description: 'Stunning crystal-embellished clutch with detachable gold chain. A statement piece for any elegant ensemble.',
    features: [
      'Austrian crystal embellishments',
      '24k gold-plated hardware',
      'Italian leather interior',
      'Detachable chain strap'
    ],
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Gold', hex: '#D4AF37' },
      { name: 'Silver', hex: '#C0C0C0' }
    ],
    rating: 4.9,
    popularity: 88
  },
  {
    id: 3,
    name: 'Velvet Heeled Pumps',
    price: 380,
    category: 'Shoes',
    description: 'Elegant velvet pumps with 4-inch heel. Timeless design meets modern comfort.',
    features: [
      'Premium Italian velvet',
      'Cushioned insole',
      'Leather sole',
      'Handcrafted in Italy'
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      'https://images.unsplash.com/photo-1584274292540-e79f53877dfb?w=800&q=80'
    ],
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: [
      { name: 'Navy', hex: '#001F3F' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    rating: 4.7,
    popularity: 82
  },
  {
    id: 4,
    name: 'Cashmere Wrap Dress',
    price: 720,
    category: 'Dresses',
    description: 'Soft cashmere wrap dress with elegant draping. Versatile luxury for day to evening.',
    features: [
      '100% cashmere',
      'Adjustable wrap tie',
      'Midi length',
      'Hand wash or dry clean'
    ],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Black', hex: '#000000' },
      { name: 'Ivory', hex: '#FFFFF0' }
    ],
    rating: 4.9,
    popularity: 92
  },
  {
    id: 5,
    name: 'Pearl Drop Earrings',
    price: 280,
    category: 'Accessories',
    description: 'Classic South Sea pearl earrings with 18k gold settings. Timeless elegance.',
    features: [
      'South Sea pearls',
      '18k gold posts',
      'Hypoallergenic',
      'Includes luxury gift box'
    ],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'White Pearl', hex: '#FFFFFF' },
      { name: 'Black Pearl', hex: '#000000' }
    ],
    rating: 5.0,
    popularity: 90
  },
  {
    id: 6,
    name: 'Leather Ankle Boots',
    price: 520,
    category: 'Shoes',
    description: 'Refined leather ankle boots with subtle heel. Perfect blend of style and comfort.',
    features: [
      'Full grain leather',
      'Memory foam insole',
      'Rubber sole',
      'Water-resistant treatment'
    ],
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80',
      'https://images.unsplash.com/photo-1542834759-926f3e2a8d0e?w=800&q=80'
    ],
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Cognac', hex: '#A0522D' }
    ],
    rating: 4.8,
    popularity: 85
  },
  {
    id: 7,
    name: 'Chiffon Cocktail Dress',
    price: 595,
    category: 'Dresses',
    description: 'Flowing chiffon cocktail dress with delicate pleating. Effortlessly sophisticated.',
    features: [
      'Lightweight chiffon',
      'Pleated bodice',
      'Concealed back zipper',
      'Fully lined'
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blush', hex: '#FFB6C1' },
      { name: 'Emerald', hex: '#50C878' },
      { name: 'Navy', hex: '#001F3F' }
    ],
    rating: 4.6,
    popularity: 78
  },
  {
    id: 8,
    name: 'Silk Scarf',
    price: 185,
    category: 'Accessories',
    description: 'Hand-rolled silk scarf with artistic print. A versatile luxury accessory.',
    features: [
      '100% silk twill',
      'Hand-rolled edges',
      'Original print design',
      'Made in France'
    ],
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
      'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&q=80'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Coral', hex: '#FF7F50' },
      { name: 'Sapphire', hex: '#0F52BA' },
      { name: 'Ivory', hex: '#FFFFF0' }
    ],
    rating: 4.7,
    popularity: 75
  },
  {
    id: 9,
    name: 'Satin Mules',
    price: 340,
    category: 'Shoes',
    description: 'Luxurious satin mules with pointed toe. Slip-on elegance for any occasion.',
    features: [
      'Duchess satin upper',
      'Padded footbed',
      'Kitten heel',
      'Made in Italy'
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
    ],
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Black', hex: '#000000' }
    ],
    rating: 4.5,
    popularity: 70
  },
  {
    id: 10,
    name: 'Lace Evening Gown',
    price: 980,
    category: 'Dresses',
    description: 'Exquisite lace evening gown with intricate detailing. Red carpet worthy.',
    features: [
      'French Chantilly lace',
      'Hand-applied embellishments',
      'Silk lining',
      'Couture construction'
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne', hex: '#F7E7CE' },
      { name: 'Black', hex: '#000000' }
    ],
    rating: 5.0,
    popularity: 98
  },
  {
    id: 11,
    name: 'Crystal Bracelet',
    price: 395,
    category: 'Accessories',
    description: 'Dazzling crystal tennis bracelet. Sparkle with every movement.',
    features: [
      'Swarovski crystals',
      'Sterling silver setting',
      'Secure clasp',
      'Adjustable length'
    ],
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Clear', hex: '#FFFFFF' },
      { name: 'Rose Gold', hex: '#B76E79' }
    ],
    rating: 4.8,
    popularity: 80
  },
  {
    id: 12,
    name: 'Patent Leather Pumps',
    price: 420,
    category: 'Shoes',
    description: 'Classic patent leather pumps with timeless silhouette. The epitome of elegance.',
    features: [
      'Patent leather finish',
      'Leather lining',
      'Non-slip sole',
      '3.5 inch heel'
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80',
      'https://images.unsplash.com/photo-1584274292540-e79f53877dfb?w=800&q=80'
    ],
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Red', hex: '#DC143C' }
    ],
    rating: 4.9,
    popularity: 87
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'All') return products;
  return products.filter(p => p.category === category);
};

export const filterProducts = (
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  sizes?: string[]
): Product[] => {
  return products.filter(product => {
    if (category && category !== 'All' && product.category !== category) return false;
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    if (sizes && sizes.length > 0) {
      const hasMatchingSize = product.sizes.some(size => sizes.includes(size));
      if (!hasMatchingSize) return false;
    }
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

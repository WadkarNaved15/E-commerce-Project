import { prisma } from "../lib/prisma"; // use your prisma client
import { products } from "../lib/products"; // path to your product array

async function main() {
  // Optional: clear existing products to avoid duplicates
  await prisma.product.deleteMany();

  // Bulk insert products
  const createManyData = products.map((product) => ({
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    features: product.features,
    images: product.images,
    sizes: product.sizes,
    rating: product.rating,
    popularity: product.popularity,
  }));

  await prisma.product.createMany({ data: createManyData });
  console.log("✅ All products added!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

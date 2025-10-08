-- AlterEnum
ALTER TYPE "Category" ADD VALUE 'Bangles';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "category" DROP NOT NULL;

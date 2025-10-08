-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "features" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "images" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "sizes" SET DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_popularity_idx" ON "Product"("popularity");

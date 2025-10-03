/*
  Warnings:

  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Color" DROP CONSTRAINT "Color_productId_fkey";

-- DropTable
DROP TABLE "public"."Color";

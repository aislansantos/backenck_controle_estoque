/*
  Warnings:

  - You are about to drop the column `id_sale` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `fk_product_id` on the `PurchaseItem` table. All the data in the column will be lost.
  - You are about to drop the column `fk_purchase_id` on the `PurchaseItem` table. All the data in the column will be lost.
  - You are about to drop the column `fk_product_id` on the `SaleItem` table. All the data in the column will be lost.
  - You are about to drop the column `fk_sale_id` on the `SaleItem` table. All the data in the column will be lost.
  - You are about to drop the `purchase` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_seller` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_id_sale_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_fk_id_category_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_fk_id_unit_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_fk_product_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseItem" DROP CONSTRAINT "PurchaseItem_fk_purchase_id_fkey";

-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_fk_product_id_fkey";

-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_fk_sale_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_fk_supplier_id_fkey";

-- DropIndex
DROP INDEX "idx_product_description";

-- DropIndex
DROP INDEX "idx_product_category_description";

-- DropIndex
DROP INDEX "idx_product_unit_description";

-- DropIndex
DROP INDEX "idx_purchase_item_fk_product_id";

-- DropIndex
DROP INDEX "idx_purchase_item_fk_purchase_id";

-- DropIndex
DROP INDEX "idx_sale_item_fk_product_id";

-- DropIndex
DROP INDEX "idx_sale_item_fk_sale_id";

-- DropIndex
DROP INDEX "idx_seller_email";

-- DropIndex
DROP INDEX "idx_seller_name";

-- DropIndex
DROP INDEX "idx_supplier_email";

-- DropIndex
DROP INDEX "idx_supplier_name";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "id_sale",
ADD COLUMN     "id_seller" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseItem" DROP COLUMN "fk_product_id",
DROP COLUMN "fk_purchase_id";

-- AlterTable
ALTER TABLE "SaleItem" DROP COLUMN "fk_product_id",
DROP COLUMN "fk_sale_id";

-- DropTable
DROP TABLE "purchase";

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "order_number" INTEGER NOT NULL,
    "purchase_order_ps" VARCHAR(255),
    "order_date" TIMESTAMP(6) NOT NULL,
    "release_date" TIMESTAMP(6) NOT NULL,
    "expiration_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_id_seller_fkey" FOREIGN KEY ("id_seller") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

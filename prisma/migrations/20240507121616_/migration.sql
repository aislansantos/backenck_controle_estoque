/*
  Warnings:

  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_unit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seller` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_fk_id_category_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_fk_id_unit_fkey";

-- DropForeignKey
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_fk_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_item" DROP CONSTRAINT "purchase_item_fk_product_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_item" DROP CONSTRAINT "purchase_item_fk_purchase_id_fkey";

-- DropForeignKey
ALTER TABLE "sale" DROP CONSTRAINT "sale_fk_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_item" DROP CONSTRAINT "sale_item_fk_product_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_item" DROP CONSTRAINT "sale_item_fk_sale_id_fkey";

-- DropTable
DROP TABLE "customer";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "product_category";

-- DropTable
DROP TABLE "product_unit";

-- DropTable
DROP TABLE "purchase_item";

-- DropTable
DROP TABLE "sale";

-- DropTable
DROP TABLE "sale_item";

-- DropTable
DROP TABLE "seller";

-- DropTable
DROP TABLE "supplier";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100),
    "city" VARCHAR(100) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "id_sale" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255),
    "amount" INTEGER NOT NULL,
    "fk_id_unit" INTEGER NOT NULL,
    "fk_id_category" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductUnit" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(3) NOT NULL,

    CONSTRAINT "ProductUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "id" SERIAL NOT NULL,
    "quantity_item" INTEGER NOT NULL,
    "unitary_value" DECIMAL(10,2) NOT NULL,
    "total_value" DECIMAL(10,2) NOT NULL,
    "fk_purchase_id" INTEGER NOT NULL,
    "fk_product_id" INTEGER NOT NULL,

    CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "order_number" INTEGER NOT NULL,
    "sale_order_ps" VARCHAR(255),
    "order_date" TIMESTAMP(6) NOT NULL,
    "release_date" TIMESTAMP(6) NOT NULL,
    "expiration_date" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleItem" (
    "id" SERIAL NOT NULL,
    "quantity_item" INTEGER NOT NULL,
    "unitary_value" DECIMAL(10,2) NOT NULL,
    "total_value" DECIMAL(10,2) NOT NULL,
    "fk_sale_id" INTEGER NOT NULL,
    "fk_product_id" INTEGER NOT NULL,

    CONSTRAINT "SaleItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "branch" VARCHAR(100) NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "idx_product_description" ON "Product"("description");

-- CreateIndex
CREATE UNIQUE INDEX "uc_product_category_description" ON "ProductCategory"("description");

-- CreateIndex
CREATE INDEX "idx_product_category_description" ON "ProductCategory"("description");

-- CreateIndex
CREATE UNIQUE INDEX "uc_product_unit_description" ON "ProductUnit"("description");

-- CreateIndex
CREATE INDEX "idx_product_unit_description" ON "ProductUnit"("description");

-- CreateIndex
CREATE INDEX "idx_purchase_item_fk_product_id" ON "PurchaseItem"("fk_product_id");

-- CreateIndex
CREATE INDEX "idx_purchase_item_fk_purchase_id" ON "PurchaseItem"("fk_purchase_id");

-- CreateIndex
CREATE INDEX "idx_sale_item_fk_product_id" ON "SaleItem"("fk_product_id");

-- CreateIndex
CREATE INDEX "idx_sale_item_fk_sale_id" ON "SaleItem"("fk_sale_id");

-- CreateIndex
CREATE UNIQUE INDEX "uc_seller_email" ON "Seller"("email");

-- CreateIndex
CREATE INDEX "idx_seller_email" ON "Seller"("email");

-- CreateIndex
CREATE INDEX "idx_seller_name" ON "Seller"("name");

-- CreateIndex
CREATE UNIQUE INDEX "uc_supplier_email" ON "Supplier"("email");

-- CreateIndex
CREATE INDEX "idx_supplier_email" ON "Supplier"("email");

-- CreateIndex
CREATE INDEX "idx_supplier_name" ON "Supplier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_id_sale_fkey" FOREIGN KEY ("id_sale") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_fk_id_category_fkey" FOREIGN KEY ("fk_id_category") REFERENCES "ProductCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_fk_id_unit_fkey" FOREIGN KEY ("fk_id_unit") REFERENCES "ProductUnit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_fk_supplier_id_fkey" FOREIGN KEY ("fk_supplier_id") REFERENCES "Supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_fk_product_id_fkey" FOREIGN KEY ("fk_product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_fk_purchase_id_fkey" FOREIGN KEY ("fk_purchase_id") REFERENCES "purchase"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_fk_product_id_fkey" FOREIGN KEY ("fk_product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_fk_sale_id_fkey" FOREIGN KEY ("fk_sale_id") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

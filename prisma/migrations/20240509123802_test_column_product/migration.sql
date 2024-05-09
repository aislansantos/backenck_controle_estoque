/*
  Warnings:

  - Made the column `amount` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "amount" SET NOT NULL,
ALTER COLUMN "active" SET NOT NULL;

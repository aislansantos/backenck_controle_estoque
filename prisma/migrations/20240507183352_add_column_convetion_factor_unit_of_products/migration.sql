/*
  Warnings:

  - Added the required column `convertionFactor` to the `ProductUnit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductUnit" ADD COLUMN     "convertionFactor" INTEGER NOT NULL;

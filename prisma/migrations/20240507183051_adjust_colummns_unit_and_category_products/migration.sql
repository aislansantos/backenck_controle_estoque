/*
  Warnings:

  - Added the required column `cat` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `un` to the `ProductUnit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "cat" VARCHAR(2) NOT NULL;

-- AlterTable
ALTER TABLE "ProductUnit" ADD COLUMN     "un" VARCHAR(2) NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR;

/*
  Warnings:

  - You are about to drop the column `fk_id_category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `fk_id_unit` on the `Product` table. All the data in the column will be lost.
  - Added the required column `id_category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_unit` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "fk_id_category",
DROP COLUMN "fk_id_unit",
ADD COLUMN     "id_category" INTEGER NOT NULL,
ADD COLUMN     "id_unit" INTEGER NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_unit_fkey" FOREIGN KEY ("id_unit") REFERENCES "ProductUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

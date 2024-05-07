/*
  Warnings:

  - You are about to drop the column `token` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "token";

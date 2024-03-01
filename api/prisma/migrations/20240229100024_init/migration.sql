/*
  Warnings:

  - Added the required column `order_unit` to the `DetailOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detailorder` ADD COLUMN `order_unit` INTEGER NOT NULL;

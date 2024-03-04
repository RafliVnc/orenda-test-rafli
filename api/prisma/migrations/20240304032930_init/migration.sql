/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_cust` on the `customer` table. All the data in the column will be lost.
  - The primary key for the `detailorder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_detailOrder` on the `detailorder` table. All the data in the column will be lost.
  - You are about to drop the column `id_order` on the `detailorder` table. All the data in the column will be lost.
  - You are about to drop the column `id_product` on the `detailorder` table. All the data in the column will be lost.
  - You are about to drop the column `order_unit` on the `detailorder` table. All the data in the column will be lost.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_cust` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `id_order` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `order_at` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `total_order` on the `order` table. All the data in the column will be lost.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_product` on the `product` table. All the data in the column will be lost.
  - Added the required column `custId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `OrderId` to the `DetailOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ProductId` to the `DetailOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailOrderId` to the `DetailOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderUnit` to the `DetailOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalOrder` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detailorder` DROP FOREIGN KEY `DetailOrder_id_order_fkey`;

-- DropForeignKey
ALTER TABLE `detailorder` DROP FOREIGN KEY `DetailOrder_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_id_cust_fkey`;

-- AlterTable
ALTER TABLE `customer` DROP PRIMARY KEY,
    DROP COLUMN `id_cust`,
    ADD COLUMN `custId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`custId`);

-- AlterTable
ALTER TABLE `detailorder` DROP PRIMARY KEY,
    DROP COLUMN `id_detailOrder`,
    DROP COLUMN `id_order`,
    DROP COLUMN `id_product`,
    DROP COLUMN `order_unit`,
    ADD COLUMN `OrderId` INTEGER NOT NULL,
    ADD COLUMN `ProductId` INTEGER NOT NULL,
    ADD COLUMN `detailOrderId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `orderUnit` INTEGER NOT NULL,
    ADD PRIMARY KEY (`detailOrderId`);

-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    DROP COLUMN `id_cust`,
    DROP COLUMN `id_order`,
    DROP COLUMN `order_at`,
    DROP COLUMN `total_order`,
    ADD COLUMN `CustId` INTEGER NOT NULL,
    ADD COLUMN `orderAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `totalOrder` INTEGER NOT NULL,
    ADD PRIMARY KEY (`orderId`);

-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    DROP COLUMN `id_product`,
    ADD COLUMN `productId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`productId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_CustId_fkey` FOREIGN KEY (`CustId`) REFERENCES `Customer`(`custId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailOrder` ADD CONSTRAINT `DetailOrder_OrderId_fkey` FOREIGN KEY (`OrderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailOrder` ADD CONSTRAINT `DetailOrder_ProductId_fkey` FOREIGN KEY (`ProductId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

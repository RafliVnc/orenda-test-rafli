-- CreateTable
CREATE TABLE `Order` (
    `id_order` INTEGER NOT NULL AUTO_INCREMENT,
    `order_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total_order` INTEGER NOT NULL,
    `discount` INTEGER NOT NULL,
    `id_cust` INTEGER NOT NULL,

    PRIMARY KEY (`id_order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailOrder` (
    `id_detailOrder` INTEGER NOT NULL AUTO_INCREMENT,
    `id_order` INTEGER NOT NULL,
    `id_product` INTEGER NOT NULL,

    PRIMARY KEY (`id_detailOrder`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_cust_fkey` FOREIGN KEY (`id_cust`) REFERENCES `Customer`(`id_cust`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailOrder` ADD CONSTRAINT `DetailOrder_id_order_fkey` FOREIGN KEY (`id_order`) REFERENCES `Order`(`id_order`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailOrder` ADD CONSTRAINT `DetailOrder_id_product_fkey` FOREIGN KEY (`id_product`) REFERENCES `Product`(`id_product`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `CategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnails` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `CategoryId` INTEGER NOT NULL,
    ADD COLUMN `cover` VARCHAR(191) NOT NULL,
    ADD COLUMN `thumbnails` JSON NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `isInactive` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `CategoryId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_CategoryId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `CategoryId`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    MODIFY `deletedAt` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`id`);
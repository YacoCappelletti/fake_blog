/*
  Warnings:

  - The primary key for the `follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followedById` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `follows` table. All the data in the column will be lost.
  - Added the required column `followedId` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerId` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `Follows_followedById_fkey`;

-- DropForeignKey
ALTER TABLE `follows` DROP FOREIGN KEY `Follows_followingId_fkey`;

-- AlterTable
ALTER TABLE `follows` DROP PRIMARY KEY,
    DROP COLUMN `followedById`,
    DROP COLUMN `followingId`,
    ADD COLUMN `followedId` INTEGER NOT NULL,
    ADD COLUMN `followerId` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

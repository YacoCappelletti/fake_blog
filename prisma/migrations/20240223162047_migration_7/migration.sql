/*
  Warnings:

  - Made the column `likes` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `posts` MODIFY `likes` INTEGER NOT NULL;

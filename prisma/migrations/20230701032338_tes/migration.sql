/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Articles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Articles" DROP CONSTRAINT "Articles_creatorId_fkey";

-- AlterTable
ALTER TABLE "Articles" DROP COLUMN "creatorId";

/*
  Warnings:

  - You are about to drop the column `tag` on the `Articles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Articles" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[];

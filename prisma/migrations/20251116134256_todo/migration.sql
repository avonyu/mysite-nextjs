/*
  Warnings:

  - The values [LOW,MEDIUM,HIGH,URGENT] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `todo_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('NORMAL', 'IMPORTANT');
ALTER TABLE "public"."todo" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "todo" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "public"."Priority_old";
ALTER TABLE "todo" ALTER COLUMN "priority" SET DEFAULT 'NORMAL';
COMMIT;

-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_userId_fkey";

-- DropForeignKey
ALTER TABLE "todo_category" DROP CONSTRAINT "todo_category_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "todo_category" DROP CONSTRAINT "todo_category_todoId_fkey";

-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "priority" SET DEFAULT 'NORMAL';

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "todo_category";

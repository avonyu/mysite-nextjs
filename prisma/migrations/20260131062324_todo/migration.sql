/*
  Warnings:

  - The primary key for the `todoItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order` on the `todoItem` table. All the data in the column will be lost.
  - The primary key for the `todoSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `todoSubstep` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order` on the `todoSubstep` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "todoItem" DROP CONSTRAINT "todoItem_todoSetId_fkey";

-- DropForeignKey
ALTER TABLE "todoSubstep" DROP CONSTRAINT "todoSubstep_todoItemId_fkey";

-- AlterTable
ALTER TABLE "todoItem" DROP CONSTRAINT "todoItem_pkey",
DROP COLUMN "order",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "todoSetId" SET DATA TYPE TEXT,
ADD CONSTRAINT "todoItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "todoItem_id_seq";

-- AlterTable
ALTER TABLE "todoSet" DROP CONSTRAINT "todoSet_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "todoSet_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "todoSet_id_seq";

-- AlterTable
ALTER TABLE "todoSubstep" DROP CONSTRAINT "todoSubstep_pkey",
DROP COLUMN "order",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "todoItemId" SET DATA TYPE TEXT,
ADD CONSTRAINT "todoSubstep_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "todoSubstep_id_seq";

-- AddForeignKey
ALTER TABLE "todoItem" ADD CONSTRAINT "todoItem_todoSetId_fkey" FOREIGN KEY ("todoSetId") REFERENCES "todoSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todoSubstep" ADD CONSTRAINT "todoSubstep_todoItemId_fkey" FOREIGN KEY ("todoItemId") REFERENCES "todoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

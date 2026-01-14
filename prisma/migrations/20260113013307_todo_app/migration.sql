/*
  Warnings:

  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "test" DROP CONSTRAINT "test_userId_fkey";

-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_userId_fkey";

-- DropTable
DROP TABLE "test";

-- DropTable
DROP TABLE "todo";

-- CreateTable
CREATE TABLE "todoItem" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "isFinish" BOOLEAN NOT NULL DEFAULT false,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "isToday" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "todoSetId" INTEGER,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "todoItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoSubstep" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "todoItemId" INTEGER NOT NULL,

    CONSTRAINT "TodoSubstep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todoSet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT,
    "bgImg" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "todoSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "todoItem" ADD CONSTRAINT "todoItem_todoSetId_fkey" FOREIGN KEY ("todoSetId") REFERENCES "todoSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todoItem" ADD CONSTRAINT "todoItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoSubstep" ADD CONSTRAINT "TodoSubstep_todoItemId_fkey" FOREIGN KEY ("todoItemId") REFERENCES "todoItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todoSet" ADD CONSTRAINT "todoSet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

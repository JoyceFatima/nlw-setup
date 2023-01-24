/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `days` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "days_date_idx";

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");

-- DropIndex
DROP INDEX "days_date_key";

-- CreateIndex
CREATE INDEX "days_date_idx" ON "days"("date");

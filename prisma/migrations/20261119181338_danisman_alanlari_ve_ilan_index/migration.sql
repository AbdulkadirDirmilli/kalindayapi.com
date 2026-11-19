-- AlterTable
ALTER TABLE "Ortak" ADD COLUMN "bolgeler" TEXT;
ALTER TABLE "Ortak" ADD COLUMN "cinsiyet" TEXT;
ALTER TABLE "Ortak" ADD COLUMN "deneyimYili" INTEGER;

-- CreateIndex
CREATE INDEX "Ilan_danismanId_idx" ON "Ilan"("danismanId");

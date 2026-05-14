-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('OPTIMAL', 'DEGRADING', 'EXPIRED');

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" JSONB NOT NULL,
    "phLevel" DOUBLE PRECISION NOT NULL,
    "mixedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "BatchStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentLog" (
    "id" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "esthetician" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "batchId" TEXT NOT NULL,

    CONSTRAINT "TreatmentLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TreatmentLog" ADD CONSTRAINT "TreatmentLog_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

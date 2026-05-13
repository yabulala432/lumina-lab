-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ingredients" JSONB NOT NULL,
    "phLevel" REAL NOT NULL,
    "mixedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TreatmentLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "room" TEXT NOT NULL,
    "esthetician" TEXT NOT NULL,
    "usedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "batchId" TEXT NOT NULL,
    CONSTRAINT "TreatmentLog_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "Batch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

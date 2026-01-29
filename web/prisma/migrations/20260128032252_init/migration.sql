-- CreateTable
CREATE TABLE "Nursery" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "type" TEXT,
    "joined" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Hospital" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "phone" TEXT,
    "isBabyFriendly" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "PostpartumCenter" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT NOT NULL,
    "bedsPostpartum" INTEGER NOT NULL DEFAULT 0,
    "bedsInfant" INTEGER NOT NULL DEFAULT 0,
    "totalBeds" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "NursingRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "openHours" TEXT
);

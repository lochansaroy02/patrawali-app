/*
  Warnings:

  - You are about to drop the `Demo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaalkhanaEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaalkhanaMovement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SeizedVehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Demo";

-- DropTable
DROP TABLE "MaalkhanaEntry";

-- DropTable
DROP TABLE "MaalkhanaMovement";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "SeizedVehicle";

-- CreateTable
CREATE TABLE "DeceasedEmployee" (
    "id" TEXT NOT NULL,
    "deceadName" TEXT NOT NULL,
    "deceadDesgnation" TEXT NOT NULL,
    "pno" TEXT NOT NULL,
    "deathDate" TIMESTAMP(3) NOT NULL,
    "dependentName" TEXT NOT NULL,
    "depandentRelation" TEXT NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL,
    "postForAppointment" TEXT NOT NULL,
    "fileNo" TEXT NOT NULL,
    "apporvalDate" TIMESTAMP(3) NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeceasedEmployee_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "DeceasedEmployee" ALTER COLUMN "deathDate" DROP NOT NULL,
ALTER COLUMN "applicationDate" DROP NOT NULL,
ALTER COLUMN "apporvalDate" DROP NOT NULL,
ALTER COLUMN "documentUrl" DROP NOT NULL;

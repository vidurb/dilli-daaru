/*
  Warnings:

  - You are about to drop the column `availabilityUpdatedAt` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "availabilityUpdatedAt",
ADD COLUMN     "vendorsUpdatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

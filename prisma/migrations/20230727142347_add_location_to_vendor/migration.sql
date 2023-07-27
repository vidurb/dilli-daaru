-- AlterTable
ALTER TABLE "public"."Vendor" ADD COLUMN     "location" geography(POINT);

-- CreateIndex
CREATE INDEX "location_idx" ON "public"."Vendor" USING GIST ("location");

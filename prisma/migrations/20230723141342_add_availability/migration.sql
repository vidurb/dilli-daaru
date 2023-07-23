-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "availabilityUpdatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."_ProductToVendor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToVendor_AB_unique" ON "public"."_ProductToVendor"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToVendor_B_index" ON "public"."_ProductToVendor"("B");

-- AddForeignKey
ALTER TABLE "public"."_ProductToVendor" ADD CONSTRAINT "_ProductToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductToVendor" ADD CONSTRAINT "_ProductToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

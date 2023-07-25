-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."ProductType" AS ENUM ('IMPORTED', 'INDIAN', 'COUNTRY');

-- CreateEnum
CREATE TYPE "public"."ProductCategory" AS ENUM ('BEER', 'WINE', 'CIDER', 'ALCOPOP', 'WHISKEY', 'VODKA', 'GIN', 'RUM', 'TEQUILA', 'BRANDY', 'OTHER', 'LIQUEUR');

-- CreateEnum
CREATE TYPE "public"."Entity" AS ENUM ('DSIIDC', 'DCCWS', 'DSCSC', 'DTTDC');

-- CreateTable
CREATE TABLE "public"."Vendor" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "productTypes" "public"."ProductType"[],
    "entity" "public"."Entity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "externalKey" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "type" "public"."ProductType" NOT NULL,
    "category" "public"."ProductCategory" NOT NULL,
    "mrp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vendorsUpdatedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ProductToVendor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_externalId_key" ON "public"."Vendor"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_externalKey_key" ON "public"."Product"("externalKey");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToVendor_AB_unique" ON "public"."_ProductToVendor"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToVendor_B_index" ON "public"."_ProductToVendor"("B");

-- AddForeignKey
ALTER TABLE "public"."_ProductToVendor" ADD CONSTRAINT "_ProductToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProductToVendor" ADD CONSTRAINT "_ProductToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;


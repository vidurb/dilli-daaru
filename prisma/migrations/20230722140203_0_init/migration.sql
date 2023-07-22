-- CreateEnum
CREATE TYPE "public"."ProductType" AS ENUM ('IMPORTED', 'INDIAN', 'COUNTRY');

-- CreateEnum
CREATE TYPE "public"."ProductCategory" AS ENUM ('BEER', 'WINE', 'CIDER', 'ALCOPOP', 'WHISKEY', 'VODKA', 'GIN', 'RUM', 'TEQUILA', 'BRANDY');

-- CreateEnum
CREATE TYPE "public"."Entity" AS ENUM ('DSIIDC', 'DCCWS', 'DSCSC');

-- CreateTable
CREATE TABLE "public"."Vendor" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "productTypes" "public"."ProductType"[],
    "entity" "public"."Entity" NOT NULL,

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

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_externalId_key" ON "public"."Vendor"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_externalKey_key" ON "public"."Product"("externalKey");

-- CreateIndex
CREATE UNIQUE INDEX "Product_externalId_key" ON "public"."Product"("externalId");

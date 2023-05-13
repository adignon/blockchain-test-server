-- CreateTable
CREATE TABLE "Adress" (
    "id" TEXT NOT NULL,
    "passphraseHash" TEXT,
    "network" TEXT NOT NULL,
    "passphrase" TEXT,
    "adress" TEXT NOT NULL,
    "pivate" TEXT NOT NULL,
    "public" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

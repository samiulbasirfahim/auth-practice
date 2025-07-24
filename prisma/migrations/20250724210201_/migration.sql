/*
  Warnings:

  - You are about to drop the `auth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "auth";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Auth" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL
);

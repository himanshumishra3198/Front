/*
  Warnings:

  - Added the required column `gameType` to the `GameSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('CHESS', 'CHECKERS', 'BLITZ_CHESS', 'MEMORY_MATCH');

-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "gameType" "GameType" NOT NULL;

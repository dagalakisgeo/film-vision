/*
  Warnings:

  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `actors` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `director` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `Movie` table. All the data in the column will be lost.
  - The `id` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `WatchEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `WatchEntry` table. All the data in the column will be lost.
  - The `id` column on the `WatchEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `personalRating` on the `WatchEntry` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to drop the `ChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `movieId` on the `WatchEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."ChatMessage" DROP CONSTRAINT "ChatMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WatchEntry" DROP CONSTRAINT "WatchEntry_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."WatchEntry" DROP CONSTRAINT "WatchEntry_userId_fkey";

-- DropIndex
DROP INDEX "public"."WatchEntry_movieId_watchDate_userId_key";

-- AlterTable
ALTER TABLE "public"."Movie" DROP CONSTRAINT "Movie_pkey",
DROP COLUMN "actors",
DROP COLUMN "director",
DROP COLUMN "genre",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Movie_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."WatchEntry" DROP CONSTRAINT "WatchEntry_pkey",
DROP COLUMN "userId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER NOT NULL,
ALTER COLUMN "personalRating" SET DATA TYPE SMALLINT,
ADD CONSTRAINT "WatchEntry_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "public"."ChatMessage";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MovieGenre" (
    "movieId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "MovieGenre_pkey" PRIMARY KEY ("movieId","genreId")
);

-- CreateTable
CREATE TABLE "public"."MovieDirector" (
    "movieId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "MovieDirector_pkey" PRIMARY KEY ("movieId","personId")
);

-- CreateTable
CREATE TABLE "public"."MovieActor" (
    "movieId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "MovieActor_pkey" PRIMARY KEY ("movieId","personId")
);

-- CreateTable
CREATE TABLE "public"."MovieCinematographer" (
    "movieId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "MovieCinematographer_pkey" PRIMARY KEY ("movieId","personId")
);

-- CreateTable
CREATE TABLE "public"."MovieScreenwriter" (
    "movieId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "MovieScreenwriter_pkey" PRIMARY KEY ("movieId","personId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "public"."Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Person_name_key" ON "public"."Person"("name");

-- CreateIndex
CREATE INDEX "Person_name_idx" ON "public"."Person"("name");

-- CreateIndex
CREATE INDEX "MovieGenre_genreId_idx" ON "public"."MovieGenre"("genreId");

-- CreateIndex
CREATE INDEX "MovieDirector_personId_idx" ON "public"."MovieDirector"("personId");

-- CreateIndex
CREATE INDEX "MovieActor_personId_idx" ON "public"."MovieActor"("personId");

-- CreateIndex
CREATE INDEX "MovieCinematographer_personId_idx" ON "public"."MovieCinematographer"("personId");

-- CreateIndex
CREATE INDEX "MovieScreenwriter_personId_idx" ON "public"."MovieScreenwriter"("personId");

-- CreateIndex
CREATE INDEX "Movie_year_idx" ON "public"."Movie"("year");

-- CreateIndex
CREATE INDEX "Movie_title_idx" ON "public"."Movie"("title");

-- CreateIndex
CREATE INDEX "WatchEntry_watchDate_idx" ON "public"."WatchEntry"("watchDate");

-- AddForeignKey
ALTER TABLE "public"."MovieGenre" ADD CONSTRAINT "MovieGenre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieGenre" ADD CONSTRAINT "MovieGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "public"."Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieDirector" ADD CONSTRAINT "MovieDirector_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieDirector" ADD CONSTRAINT "MovieDirector_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieActor" ADD CONSTRAINT "MovieActor_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieActor" ADD CONSTRAINT "MovieActor_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieCinematographer" ADD CONSTRAINT "MovieCinematographer_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieCinematographer" ADD CONSTRAINT "MovieCinematographer_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieScreenwriter" ADD CONSTRAINT "MovieScreenwriter_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MovieScreenwriter" ADD CONSTRAINT "MovieScreenwriter_personId_fkey" FOREIGN KEY ("personId") REFERENCES "public"."Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WatchEntry" ADD CONSTRAINT "WatchEntry_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

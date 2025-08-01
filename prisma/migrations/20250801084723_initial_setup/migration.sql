-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER,
    "imdbId" TEXT,
    "tmdbId" INTEGER,
    "poster" TEXT,
    "genre" JSONB NOT NULL,
    "director" TEXT,
    "actors" JSONB NOT NULL,
    "plot" TEXT,
    "runtime" INTEGER,
    "imdbRating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WatchEntry" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "watchDate" TIMESTAMP(3) NOT NULL,
    "personalRating" INTEGER,
    "personalNotes" TEXT,
    "mood" TEXT,
    "location" TEXT,
    "rewatched" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WatchEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatMessage" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "context" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imdbId_key" ON "public"."Movie"("imdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "public"."Movie"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchEntry_movieId_watchDate_userId_key" ON "public"."WatchEntry"("movieId", "watchDate", "userId");

-- AddForeignKey
ALTER TABLE "public"."WatchEntry" ADD CONSTRAINT "WatchEntry_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WatchEntry" ADD CONSTRAINT "WatchEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatMessage" ADD CONSTRAINT "ChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

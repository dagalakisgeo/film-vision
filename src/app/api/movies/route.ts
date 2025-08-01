// src/app/api/movies/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/movies
 * Returns all movies from the database with their watch entries
 */
export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        watchEntries: {
          orderBy: {
            watchDate: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(movies);
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/movies
 * Adds a new movie to the database
 * Expected body: { title, year?, imdbId?, tmdbId?, poster?, genre, director?, actors, plot?, runtime?, imdbRating? }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, year, imdbId, tmdbId, poster, genre, director, actors, plot, runtime, imdbRating } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Movie title is required' },
        { status: 400 }
      );
    }

    // Check if movie already exists
    const existingMovie = await prisma.movie.findFirst({
      where: {
        OR: [
          { title: title, year: year },
          { imdbId: imdbId },
          { tmdbId: tmdbId }
        ].filter(Boolean)
      }
    });

    if (existingMovie) {
      return NextResponse.json(
        { error: 'Movie already exists', movie: existingMovie },
        { status: 409 }
      );
    }

    // Create new movie
    const movie = await prisma.movie.create({
      data: {
        title,
        year: year ? parseInt(year) : null,
        imdbId,
        tmdbId: tmdbId ? parseInt(tmdbId) : null,
        poster,
        genre: Array.isArray(genre) ? genre : [genre].filter(Boolean),
        director,
        actors: Array.isArray(actors) ? actors : [actors].filter(Boolean),
        plot,
        runtime: runtime ? parseInt(runtime) : null,
        imdbRating: imdbRating ? parseFloat(imdbRating) : null,
      }
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error('Failed to create movie:', error);
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 500 }
    );
  }
}
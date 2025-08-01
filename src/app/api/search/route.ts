// src/app/api/search/route.ts
import { NextResponse } from 'next/server';
import { searchMovie } from '@/lib/movieAPI';

/**
 * Handles the GET request for movie search.
 * This API route is a serverless function that queries the TMDB API
 * using the searchMovie function and returns the results.
 *
 * It expects a 'query' search parameter in the URL.
 * Example: /api/search?query=inception
 */
export async function GET(request: Request) {
  try {
    // Parse the URL to get search parameters.
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    // If no query is provided, return an error.
    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    // Call the searchMovie function from our lib to get movie data.
    const movies = await searchMovie(query);

    // Return the movie data as a JSON response.
    return NextResponse.json(movies);
  } catch (error) {
    console.error('API Error:', error);
    // Return a server error response if something goes wrong.
    return NextResponse.json({ error: 'Failed to fetch movie data' }, { status: 500 });
  }
}

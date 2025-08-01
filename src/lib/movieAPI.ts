// lib/movieAPI.ts

// This function searches for a movie using the TMDB API.
// It is a server-side function, so it can safely access environment variables.

export async function searchMovie(query: string) {
  // Check if the TMDB API key is available.
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error('TMDB_API_KEY is not defined in environment variables.');
    throw new Error('TMDB API key not configured.');
  }

  // Define the base URL for the TMDB search endpoint.
  // The query is URL-encoded to handle spaces and special characters.
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    // Make the API call to TMDB.
    const response = await fetch(url);
    if (!response.ok) {
      // If the response is not successful, throw an error with the status.
      throw new Error(`TMDB API call failed with status: ${response.status}`);
    }

    // Parse the JSON response.
    const data = await response.json();

    // Return the search results.
    // The data object typically contains a `results` array with movie objects.
    return data.results;
  } catch (error) {
    console.error('Error fetching movie from TMDB:', error);
    // Rethrow the error to be handled by the caller.
    throw error;
  }
}
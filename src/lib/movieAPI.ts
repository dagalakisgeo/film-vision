export async function searchMovie(query: string) {
  // Check if the TMDB API key is available.
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error('TMDB_API_KEY is not defined in environment variables.');
    throw new Error('TMDB API key not configured.');
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error('Error fetching movie from TMDB:', error);
    throw error;
  }
}
// src/lib/tmdb.ts
const TMDB_BASE = 'https://api.themoviedb.org/3';

function getApiKey() {
const apiKey = process.env.TMDB_API_KEY;
if (!apiKey) throw new Error('TMDB_API_KEY is not set');
return apiKey;
}

export type TmdbMovieWithCredits = {
id: number;
title: string;
release_date?: string;
overview?: string;
runtime?: number | null;
poster_path?: string | null;
vote_average?: number | null;
genres: { id: number; name: string }[];
credits: {
cast: { name: string }[];
crew: { name: string; job: string; department?: string }[];
};
};

// fetch details and credits in one call using append_to_response=credits
export async function getMovieWithCredits(
tmdbId: number
): Promise<TmdbMovieWithCredits> {
const apiKey = getApiKey();
const url = ${TMDB_BASE}/movie/${tmdbId}?api_key=${apiKey}&append_to_response=credits; // append credits
const res = await fetch(url, { next: { revalidate: 60 } }); // 60s ISR revalidation
if (!res.ok) throw new Error(TMDB details failed: ${res.status});
return res.json();
}

// map crew roles into your normalized buckets
export function mapCrew(credits: TmdbMovieWithCredits['credits']) {
const directors = credits.crew
.filter(c => c.job === 'Director')
.map(c => c.name); // crew comes from credits endpoint/append

const cinematographers = credits.crew
.filter(c =>
['Director of Photography', 'Cinematographer', 'Cinematography'].includes(
c.job
)
)
.map(c => c.name);

const screenwriters = credits.crew
.filter(c =>
['Writer', 'Screenplay', 'Screenwriter', 'Story', 'Adaptation'].includes(
c.job
)
)
.map(c => c.name);

// Take top-billed actors
const actors = credits.cast.slice(0, 12).map(c => c.name);

return { directors, cinematographers, screenwriters, actors };
}
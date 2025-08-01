'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * Interface for a movie entry in the diary.
 * This is a placeholder structure and can be expanded later.
 */
interface MovieEntry {
  id: string;
  title: string;
  date: string;
  rating?: number;
  notes?: string;
}

/**
 * The main dashboard for the movie diary application.
 * This is a client component to allow for future interactivity.
 * It currently serves as a placeholder for the user's movie history,
 * but is ready to be populated with data from the database.
 */
export default function Home() {
  const [watchEntries, setWatchEntries] = useState<MovieEntry[]>([]); // Placeholder for movie data

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
        <h1 className="text-4xl font-bold mb-4 sm:mb-0">Your Movie Diary</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/add-movie" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
            Add New Movie
          </Link>
          <Link href="/upload-csv" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
            Upload CSV
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {watchEntries.length > 0 ? (
          // Placeholder for movie list
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*
              Replace this with a map over your watchEntries data to display each movie.
              For example:
              {watchEntries.map((entry) => (
                <MovieCard key={entry.id} entry={entry} />
              ))}
            */}
            <p>Your movie history will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">No movies in your diary yet.</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Start by adding your first movie or uploading a CSV file.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/add-movie" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200">
                Add a Movie Now
              </Link>
              <Link href="/upload-csv" className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
                Upload from CSV
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer / AI Chat Placeholder */}
      <footer className="mt-12 p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="text-xl font-bold">AI Chatbot Placeholder</p>
        <p className="text-gray-600 dark:text-gray-300">You will be able to chat with your AI movie assistant here.</p>
      </footer>
    </div>
  );
}
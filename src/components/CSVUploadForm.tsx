'use client';

import React, { useState } from 'react';
import Papa, { ParseResult } from 'papaparse';

// To fix the "Could not find a declaration file" error, run:
// npm install --save-dev @types/papaparse

/**
 * Interface for the expected structure of a movie entry in the CSV file.
 * This provides type safety for the parsed data.
 */
interface MovieEntry {
  Title: string;
  Date: string;
  Rating: string;
}

/**
 * A form component for uploading and parsing a CSV file.
 * It uses the `papaparse` library to handle CSV parsing.
 * The parsed data is stored in the component's state.
 */
export default function CSVUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<MovieEntry[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle file selection from the input.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle the form submission.
  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setLoading(true);
    setMessage('Parsing CSV...');

    Papa.parse<MovieEntry>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: ParseResult<MovieEntry>) => {
        setHeaders(result.meta.fields || []);
        setData(result.data);
        setLoading(false);
        setMessage(`Successfully parsed ${result.data.length} rows.`);
        console.log('Parsed data:', result.data);
      },
      error: (error: Error) => {
        setLoading(false);
        setMessage(`Error parsing CSV: ${error.message}`);
        console.error('CSV parse error:', error);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Upload Watch History CSV</h2>
      <form onSubmit={handleFileUpload} className="w-full flex flex-col items-center">
        <label className="w-full cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 transition-colors duration-200">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center text-center">
            {file ? (
              <span className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</span>
            ) : (
              <>
                <svg className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4v0a4 4 0 014-4h10a4 4 0 014 4v0a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3-3m0 0l-3 3m3-3v10"></path></svg>
                <p className="text-sm text-gray-500 dark:text-gray-400">Drag & drop a CSV file here, or click to browse</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Make sure it has columns like &quot;Title&quot;, &quot;Date&quot;, &quot;Rating&quot;</p>
              </>
            )}
          </div>
        </label>
        <button
          type="submit"
          disabled={!file || loading}
          className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Uploading...' : 'Upload & Parse'}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">{message}</p>}
      {data.length > 0 && (
        <div className="mt-6 w-full p-4 bg-gray-50 dark:bg-gray-900 rounded-lg max-h-60 overflow-y-auto">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Preview Data</h3>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-4 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {data.slice(0, 5).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header) => (
                    <td key={header} className="px-4 py-2 whitespace-nowrap">{row[header as keyof MovieEntry]}</td>
                  ))}
                </tr>
              ))}
              {data.length > 5 && (
                <tr>
                  <td colSpan={headers.length} className="px-4 py-2 text-center italic">...and {data.length - 5} more rows</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

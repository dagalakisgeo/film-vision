import CSVUploadForm from '@/components/CSVUploadForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Movie History - Film Vision',
  description: 'Upload your movie watch history from a CSV file to get started.',
};

/**
 * The page for uploading movie watch history via a CSV file.
 * This page is a client component wrapper for the CSVUploadForm.
 */
export default function UploadCsvPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <CSVUploadForm />
    </div>
  );
}

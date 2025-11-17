'use client';

import { DownloadPDFButton } from '@/components/PDF';
import { testPDFDownload } from '@/utils/testPDF';
import { Button, Loading } from '@/components';
import { useRecords } from '@/hooks/useRecords';
import { useState } from 'react';

export default function TestPDFPage() {
  const [selectedRecordId, setSelectedRecordId] = useState<string>('');
  const { records, loading } = useRecords({ autoFetch: true });

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Test PDF Generation</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Download PDF with Fetched Data</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Select a record from the list below to download its PDF. The PDF will use data fetched from the backend.
        </p>
        
        {loading ? (
          <Loading text="Loading records..." />
        ) : records.length > 0 ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select a Record:</label>
              <select
                value={selectedRecordId}
                onChange={(e) => setSelectedRecordId(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              >
                <option value="">-- Select a record --</option>
                {records.map((record) => (
                  <option key={record.id} value={record.id}>
                    {record.name} - {record.consumerId} ({record.testResults?.length || 0} test(s))
                  </option>
                ))}
              </select>
            </div>
            
            {selectedRecordId && (
              <div className="space-x-4">
                <DownloadPDFButton recordId={selectedRecordId} />
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No records found. Please add some records first.</p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test with Dummy Data (Legacy)</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          For testing purposes only - uses hardcoded dummy data.
        </p>
        
        <div className="space-x-4">
          <Button
            onClick={testPDFDownload}
            variant="primary"
          >
            Test PDF (Alternative)
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">PDF Features:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>Header with logo placeholder and company address (left column)</li>
          <li>Name, Customer ID, and Date (right column)</li>
          <li>Table format with parameters in left column</li>
          <li>Values in center column</li>
          <li>Color-coded rating bars showing: Very Low | Low | Medium | Optimum | Very High</li>
          <li>All test parameters: pH, N, P, K, Ca, Mg, OC</li>
        </ul>
      </div>
    </div>
  );
}


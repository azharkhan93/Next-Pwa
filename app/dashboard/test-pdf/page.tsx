'use client';

import { DownloadPDFButton } from '@/components/PDF';
import { testPDFDownload } from '@/utils/testPDF';
import { Button } from '@/components';

export default function TestPDFPage() {
  const dummyData = {
    name: 'John Doe',
    consumerId: '12345',
    parentage: 'Father Name',
    address: '123 Main Street',
    district: 'Test District',
    pinCode: '123456',
    phoneNo: '9876543210',
    adharNo: '1234-5678-9012',
    khasraNo: 'KH-001',
    latitude: '28.6139',
    longitude: '77.2090',
    location: 'New Delhi',
    city: 'Delhi',
    stateVal: 'Delhi',
    crop: 'wheat',
    plantationType: 'irrigated',
    age: 5,
    noTrees: 100,
    area: 2.5,
    noOfSamples: 1,
    soilDepth: '0-30cm',
    soilType: 'loam',
    drainage: 'good',
    irrigationMethod: 'drip',
    paramPh: true,
    paramDl: false,
    paramCl: false,
    testResults: [
      {
        id: 'test-1',
        labTestNo: '01',
        ph: '7.2',
        organicCarbon: '0.8',
        nitrogen: '200',
        phosphorus: '15',
        potassium: '150',
        calcium: '1200',
        magnesium: '300',
      },
    ],
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Test PDF Generation</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Download PDF with Dummy Data</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Click the button below to generate and download a PDF with sample soil test data.
        </p>
        
        <div className="space-x-4">
          <DownloadPDFButton data={dummyData} />
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


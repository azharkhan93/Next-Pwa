'use client';

import { downloadPDF } from './generatePDF';
import { RecordData } from '@/hooks/useRecords';

/**
 * Test function to generate PDF with dummy data
 */
export async function testPDFDownload() {
  const dummyData: RecordData = {
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

  await downloadPDF(dummyData, 'Test_Soil_Report.pdf');
}


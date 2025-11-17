import { pdf } from '@react-pdf/renderer';
import { RecordPDFTemplate } from '@/components/PDF/RecordPDFTemplate';
import { RecordData } from '@/hooks/useRecords';

/**
 * Generate PDF blob from record data
 */
export async function generatePDF(recordData: RecordData): Promise<Blob> {
  const doc = <RecordPDFTemplate data={recordData} />;
  const asPdf = pdf(doc);
  const blob = await asPdf.toBlob();
  return blob;
}

/**
 * Download PDF file from record data
 */
export async function downloadPDF(recordData: RecordData, filename?: string): Promise<void> {
  try {
    const blob = await generatePDF(recordData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `Soil_Test_Report_${recordData.consumerId || recordData.id || 'report'}_${new Date().getTime()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}


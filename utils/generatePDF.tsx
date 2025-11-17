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
 * Sanitize filename by removing invalid characters
 */
function sanitizeFilename(name: string): string {
  // Replace invalid filename characters with underscores
  return name
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .trim();
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
    
    // Generate filename: Soil-Test_Report_[name]_Report.pdf
    if (filename) {
      link.download = filename;
    } else {
      const name = recordData.name || 'Report';
      const sanitizedName = sanitizeFilename(name);
      link.download = `${sanitizedName}_Report.pdf`;
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}


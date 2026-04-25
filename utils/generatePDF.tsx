import { pdf } from '@react-pdf/renderer';
import { RecordPDFTemplate } from '@/components/PDF/RecordPDFTemplate';
import { RecordData } from '@/hooks/useRecords';
import { generateVerificationQR } from './qrGenerator';

/**
 * Generate PDF blob from record data
 */
export async function generatePDF(recordData: RecordData): Promise<Blob> {
  let qrCodeDataUrl = "";
  
  if (recordData.id) {
    try {
      qrCodeDataUrl = await generateVerificationQR(recordData.id);
    } catch (err) {
      console.error("Failed to generate QR for PDF:", err);
    }
  }

  const doc = <RecordPDFTemplate data={recordData} qrCodeDataUrl={qrCodeDataUrl} />;
  const asPdf = pdf(doc);
  const blob = await asPdf.toBlob();
  return blob;
}

/**
 * Sanitize filename by removing invalid characters
 */
function sanitizeFilename(name: string): string {
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

'use client';

import { useState } from 'react';
import { Button } from '@/components';
import { downloadPDF } from '@/utils/generatePDF';
import { RecordData } from '@/hooks/useRecords';
import { MdPictureAsPdf } from 'react-icons/md';

interface DownloadPDFButtonProps {
  data: RecordData;
  filename?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'error' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

export function DownloadPDFButton({ 
  data, 
  filename, 
  className,
  variant = 'outlined',
  size = 'md'
}: DownloadPDFButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      await downloadPDF(data, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className={className}
      variant={variant}
      size={size}
    >
      <MdPictureAsPdf className="mr-2" size={18} />
      {loading ? 'Generating...' : 'Download PDF'}
    </Button>
  );
}


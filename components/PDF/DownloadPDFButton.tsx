'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components';
import { downloadPDF } from '@/utils/generatePDF';
import { RecordData, useRecords } from '@/hooks/useRecords';
import { MdPictureAsPdf } from 'react-icons/md';

interface DownloadPDFButtonProps {
  data?: RecordData;
  recordId?: string;
  filename?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'error' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

export function DownloadPDFButton({ 
  data: propData,
  recordId,
  filename, 
  className,
  variant = 'outlined',
  size = 'md'
}: DownloadPDFButtonProps) {
  const [loading, setLoading] = useState(false);
  const [recordData, setRecordData] = useState<RecordData | null>(propData || null);
  
  const { getRecordById } = useRecords({ autoFetch: false });

  // Fetch record data if recordId is provided
  useEffect(() => {
    if (recordId && !propData) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const fetchedData = await getRecordById(recordId);
          if (fetchedData) {
            setRecordData(fetchedData);
          }
        } catch (error) {
          console.error('Error fetching record:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [recordId, propData, getRecordById]);

  const handleDownload = async () => {
    if (!recordData) {
      alert('No data available to generate PDF. Please try again.');
      return;
    }

    try {
      setLoading(true);
      await downloadPDF(recordData, filename);
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
      disabled={loading || !recordData}
      className={className}
      variant={variant}
      size={size}
    >
      <MdPictureAsPdf className="mr-2" size={18} />
      {loading ? 'Generating...' : 'Download PDF'}
    </Button>
  );
}


import { RecordData } from "@/hooks/useRecords";
import { downloadPDF } from "@/utils/generatePDF";

/**
 * Column configuration for the data table
 */
export function getColumnConfig(records: RecordData[]) {
  const columnMap: Array<{ key: keyof RecordData; label: string }> = [
    { key: "consumerId", label: "Consumer ID" },
    { key: "name", label: "Name" },
    { key: "phoneNo", label: "Phone" },
    { key: "district", label: "District" },
    { key: "crop", label: "Crop" },
    { key: "testResults", label: "Test Results" },
    { key: "createdAt", label: "Created At" },
  ];

  if (records.length > 0) {
    const firstRecord = records[0];
    const availableKeys = Object.keys(firstRecord) as Array<keyof RecordData>;
    return columnMap.filter((col) => availableKeys.includes(col.key));
  }

  return columnMap.slice(0, 5);
}

/**
 * Format cell value for display
 */
export function formatCellValue(
  rawValue: unknown,
  key: keyof RecordData
): string {
  if (key === "createdAt" && rawValue) {
    return new Date(rawValue as string).toLocaleDateString();
  } else if (key === "location" && rawValue) {
    const locationStr = String(rawValue);
    const firstPart = locationStr.split(",")[0].trim();
    return firstPart || "-";
  } else if (rawValue === null || rawValue === undefined || rawValue === "") {
    return "-";
  } else {
    return String(rawValue);
  }
}

/**
 * Handle PDF export for multiple selected records
 */
export async function handlePDFExport(
  selectedRecords: RecordData[],
  onProgress?: (progress: {
    current: number;
    total: number;
    currentRecord?: string;
  }) => void
): Promise<{ successful: string[]; errors: string[] }> {
  if (selectedRecords.length === 0) {
    throw new Error("No records selected for export.");
  }

  const errors: string[] = [];
  const successful: string[] = [];

  for (let i = 0; i < selectedRecords.length; i++) {
    const record = selectedRecords[i];
    if (record) {
      try {
        onProgress?.({
          current: i + 1,
          total: selectedRecords.length,
          currentRecord:
            record.name || record.consumerId || `Record ${i + 1}`,
        });

        await downloadPDF(record);
        successful.push(
          record.name || record.consumerId || `Record ${i + 1}`
        );

        if (i < selectedRecords.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      } catch (error) {
        console.error(`Error generating PDF for record ${record.id}:`, error);
        const recordName = record.name || record.consumerId || `Record ${i + 1}`;
        errors.push(recordName);
      }
    }
  }

  return { successful, errors };
}

/**
 * Show export summary alert
 */
export function showExportSummary(successful: string[], errors: string[]) {
  if (errors.length > 0 && successful.length > 0) {
    alert(
      `Export completed with some errors:\n\n` +
        `✅ Successfully exported: ${successful.length} PDF(s)\n` +
        `❌ Failed: ${errors.length} PDF(s)`
    );
  } else if (errors.length > 0) {
    alert(`❌ Failed to export ${errors.length} PDF(s). Please try again.`);
  } else {
    if (successful.length > 1) {
      alert(`✅ Successfully exported ${successful.length} PDF files!`);
    }
  }
}

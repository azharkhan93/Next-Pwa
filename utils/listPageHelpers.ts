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
    { key: "parentage", label: "Parentage" },
    { key: "address", label: "Address" },
    { key: "pinCode", label: "Pin Code" },
    { key: "adharNo", label: "Aadhar No" },
    { key: "khasraNo", label: "Khasra No" },
    { key: "location", label: "Location" },
    { key: "plantationType", label: "Plantation Type" },
    { key: "age", label: "Age" },
    { key: "noTrees", label: "No. of Trees" },
    { key: "area", label: "Area" },
    { key: "noOfSamples", label: "No. of Samples" },
    { key: "soilDepth", label: "Soil Depth" },
    { key: "soilType", label: "Soil Type" },
    { key: "drainage", label: "Drainage" },
    { key: "irrigationMethod", label: "Irrigation Method" },
  ];

  // If we have records, use Object.keys from first record to determine which columns to show
  if (records.length > 0) {
    const firstRecord = records[0];
    const availableKeys = Object.keys(firstRecord) as Array<keyof RecordData>;

    // Filter to only show columns that exist in the data, excluding city and stateVal
    return columnMap.filter(
      (col) =>
        availableKeys.includes(col.key) &&
        col.key !== "city" &&
        col.key !== "stateVal"
    );
  }

  // Default columns if no records
  return columnMap
    .filter((col) => col.key !== "city" && col.key !== "stateVal")
    .slice(0, 9);
}

/**
 * Get filtered records based on state and city filters
 */
export function getFilteredRecords(
  records: RecordData[],
  stateFilter: string,
  cityFilter: string
): RecordData[] {
  let filtered = records;

  // Apply state filter
  if (stateFilter) {
    filtered = filtered.filter((record) => record.stateVal === stateFilter);
  }

  // Apply city filter
  if (cityFilter) {
    filtered = filtered.filter((record) => record.city === cityFilter);
  }

  return filtered;
}

/**
 * Generate filter options from records
 */
export function getStateOptions(records: RecordData[]) {
  const states = Array.from(
    new Set(records.map((r) => r.stateVal).filter(Boolean))
  ).sort();
  return states.map((state) => ({
    label: state as string,
    value: state as string,
  }));
}

export function getCityOptions(records: RecordData[]) {
  const cities = Array.from(
    new Set(records.map((r) => r.city).filter(Boolean))
  ).sort();
  return cities.map((city) => ({
    label: city as string,
    value: city as string,
  }));
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
    // Extract only the first part (city/area name) from the full address
    const locationStr = String(rawValue);
    const firstPart = locationStr.split(",")[0].trim();
    return firstPart || "-";
  } else if (rawValue === null || rawValue === undefined || rawValue === "") {
    return "-";
  } else if (typeof rawValue === "object") {
    return JSON.stringify(rawValue);
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

  // Download PDFs for each selected record
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

        // Add a delay between downloads to avoid browser blocking multiple downloads
        // Increased delay for better browser compatibility
        if (i < selectedRecords.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      } catch (error) {
        console.error(`Error generating PDF for record ${record.id}:`, error);
        const recordName =
          record.name || record.consumerId || `Record ${i + 1}`;
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
        `❌ Failed: ${errors.length} PDF(s)\n\n` +
        `Failed records: ${errors.join(", ")}`
    );
  } else if (errors.length > 0) {
    alert(
      `Failed to export all PDFs:\n\n` +
        `❌ Failed: ${errors.length} PDF(s)\n\n` +
        `Records: ${errors.join(", ")}\n\n` +
        `Please try again or export them individually.`
    );
  } else {
    // All successful
    if (successful.length > 1) {
      alert(`✅ Successfully exported ${successful.length} PDF files!`);
    }
  }
}


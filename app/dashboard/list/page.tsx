"use client";

import {
  DataTable,
  ConfirmDialog,
  FilterBar,
  Search,
  Pagination,
  ExportMenu,
  TestResultsCell,
  Loading,
} from "@/components";
import React from "react";
import { useRecords, type RecordData, useDebounce } from "@/hooks";
import { useRouter } from "next/navigation";

export default function ListPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const [searchValue, setSearchValue] = React.useState("");

  // Debounce search value with 500ms delay
  const debouncedSearch = useDebounce(searchValue, 500);

  const {
    records,
    loading,
    error,
    totalPages,
    fetchRecords,
    deleteRecord,
    refetch,
  } = useRecords({
    page: currentPage,
    limit: itemsPerPage,
    autoFetch: true,
    search: debouncedSearch,
  });

  const [stateFilter, setStateFilter] = React.useState("");
  const [cityFilter, setCityFilter] = React.useState("");
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<string | null>(null);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  // Reset to page 1 when debounced search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Fetch records when page or debounced search changes
  React.useEffect(() => {
    fetchRecords({
      page: currentPage,
      limit: itemsPerPage,
      search: debouncedSearch,
    });
  }, [currentPage, debouncedSearch, fetchRecords, itemsPerPage]);

  // Column configuration with key mapping
  const columnConfig = React.useMemo(() => {
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
  }, [records]);

  // Generate columns from configuration
  const columns = React.useMemo(() => {
    return columnConfig.map((col) => col.label);
  }, [columnConfig]);

  // Get filtered records for edit/delete operations (only client-side filters now)
  // Search is now handled on the backend, so we only need to apply state/city filters
  const filteredRecords = React.useMemo(() => {
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
  }, [records, stateFilter, cityFilter]);

  const handleEdit = (idx: number) => {
    const record = filteredRecords[idx];
    if (record?.id) {
      router.push(`/dashboard/edit/${record.id}`);
    }
  };

  const handleDelete = (idx: number) => {
    const record = filteredRecords[idx];
    if (record?.id) {
      setSelectedRow(record.id);
      setConfirmOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedRow) {
      const success = await deleteRecord(selectedRow);
      if (success) {
        setConfirmOpen(false);
        setSelectedRow(null);
        await refetch();
      }
    }
  };

  const handleClearFilters = () => {
    setStateFilter("");
    setCityFilter("");
    setSearchValue("");
    setCurrentPage(1);
  };

  const handleExport = (format: "pdf" | "word") => {
    console.log(
      `Exporting ${selectedRows.length} rows as ${format.toUpperCase()}`
    );
    console.log("Selected row indices:", selectedRows);
    console.log(
      "Selected data:",
      selectedRows.map((idx) => filteredRecords[idx])
    );
    alert(
      `Export functionality for ${format.toUpperCase()} format will be implemented here. Selected ${
        selectedRows.length
      } row(s).`
    );
  };

  // Generate filter options from actual data (keeping filters but not showing columns)
  const stateOptions = React.useMemo(() => {
    const states = Array.from(
      new Set(records.map((r) => r.stateVal).filter(Boolean))
    ).sort();
    return states.map((state) => ({
      label: state as string,
      value: state as string,
    }));
  }, [records]);

  const cityOptions = React.useMemo(() => {
    const cities = Array.from(
      new Set(records.map((r) => r.city).filter(Boolean))
    ).sort();
    return cities.map((city) => ({
      label: city as string,
      value: city as string,
    }));
  }, [records]);

  // Filter data based on search and filters
  const filteredData = React.useMemo(() => {
    // Transform filtered records to table data format
    return filteredRecords.map((record) => {
      return columnConfig.map((col) => {
        const rawValue = record[col.key];
        let displayValue: string | React.ReactNode;

        // Format special fields
        if (col.key === "testResults") {
          // Use TestResultsCell component for test results
          return (
            <TestResultsCell
              key={`test-results-${
                record.id || record.consumerId || Math.random()
              }`}
              testResults={record.testResults}
            />
          );
        } else if (col.key === "createdAt" && rawValue) {
          displayValue = new Date(rawValue as string).toLocaleDateString();
        } else if (col.key === "location" && rawValue) {
          // Extract only the first part (city/area name) from the full address
          const locationStr = String(rawValue);
          const firstPart = locationStr.split(",")[0].trim();
          displayValue = firstPart || "-";
        } else if (
          rawValue === null ||
          rawValue === undefined ||
          rawValue === ""
        ) {
          displayValue = "-";
        } else if (typeof rawValue === "object") {
          displayValue = JSON.stringify(rawValue);
        } else {
          displayValue = String(rawValue);
        }

        return displayValue;
      });
    });
  }, [filteredRecords, columnConfig]);

  if (loading && records.length === 0) {
    return <Loading  fullScreen />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <FilterBar
        searchComponent={
          <Search
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search by Consumer ID, Phone, or Lab Test No..."
          />
        }
        filters={[
          {
            label: "State",
            key: "state",
            options: stateOptions,
            value: stateFilter,
            onChange: setStateFilter,
          },
          {
            label: "City",
            key: "city",
            options: cityOptions,
            value: cityFilter,
            onChange: setCityFilter,
          },
        ]}
        onClearAll={handleClearFilters}
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        onEditRow={handleEdit}
        onDeleteRow={handleDelete}
        enableSelection={true}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        exportMenu={
          <ExportMenu
            selectedRows={selectedRows}
            totalRows={filteredData.length}
            onExport={handleExport}
            disabled={selectedRows.length === 0}
          />
        }
      />

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showFirstLast={true}
          maxVisiblePages={5}
          size="md"
        />
      </div>

      {confirmOpen && (
        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm delete"
          description={`Are you sure you want to delete this record? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

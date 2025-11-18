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
import { useRecords, useDebounce } from "@/hooks";
import { useRouter } from "next/navigation";
import {
  getColumnConfig,
  getFilteredRecords,
  getStateOptions,
  getCityOptions,
  formatCellValue,
  handlePDFExport,
  showExportSummary,
} from "@/utils/listPageHelpers";

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
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportProgress, setExportProgress] = React.useState<{
    current: number;
    total: number;
    currentRecord?: string;
  } | null>(null);

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
    return getColumnConfig(records);
  }, [records]);

  // Generate columns from configuration
  const columns = React.useMemo(() => {
    return columnConfig.map((col) => col.label);
  }, [columnConfig]);

  // Get filtered records for edit/delete operations (only client-side filters now)
  // Search is now handled on the backend, so we only need to apply state/city filters
  const filteredRecords = React.useMemo(() => {
    return getFilteredRecords(records, stateFilter, cityFilter);
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

  const handleExport = async (format: "pdf" | "word") => {
    if (format === "pdf") {
      const selectedRecords = selectedRows.map((idx) => filteredRecords[idx]);

      if (selectedRecords.length === 0) {
        alert("No records selected for export.");
        return;
      }

      setIsExporting(true);
      setExportProgress({ current: 0, total: selectedRecords.length });

      try {
        const { successful, errors } = await handlePDFExport(
          selectedRecords,
          (progress) => setExportProgress(progress)
        );

        setIsExporting(false);
        setExportProgress(null);

        showExportSummary(successful, errors);
      } catch (error) {
        setIsExporting(false);
        setExportProgress(null);
        alert(error instanceof Error ? error.message : "Export failed");
      }
    } else if (format === "word") {
      alert(
        `Word export functionality will be implemented here. Selected ${selectedRows.length} row(s).`
      );
    }
  };

  // Generate filter options from actual data (keeping filters but not showing columns)
  const stateOptions = React.useMemo(() => {
    return getStateOptions(records);
  }, [records]);

  const cityOptions = React.useMemo(() => {
    return getCityOptions(records);
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
        } else {
          displayValue = formatCellValue(rawValue, col.key);
        }

        return displayValue;
      });
    });
  }, [filteredRecords, columnConfig]);

  if (loading && records.length === 0) {
    return <Loading fullScreen />;
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
            isExporting={isExporting}
            exportProgress={exportProgress}
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

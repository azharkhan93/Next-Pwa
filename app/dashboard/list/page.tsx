"use client";

import {
  DataTable,
  ConfirmDialog,
  FilterBar,
  Search,
  Pagination,
  ExportMenu,
} from "@/components";
import React from "react";

export default function ListPage() {
  const columns = [
    "Name",
    "Full name",
    "Email",
    "Phone",
    "Address",
    "Location",
    "City",
    "State",
    "Gender",
    "Product name",
    "Quantity",
  ];

  const data = [
    [
      "J. Doe",
      "John Doe",
      "john@example.com",
      "+1 555-0100",
      "123 Main St",
      "Downtown",
      "Seattle",
      "WA",
      "Male",
      "Keyboard",
      2,
    ],
    [
      "A. Smith",
      "Alice Smith",
      "alice@example.com",
      "+1 555-0111",
      "456 Pine Ave",
      "Midtown",
      "Austin",
      "TX",
      "Female",
      "Headphones",
      1,
    ],
    [
      "B. Lee",
      "Bruce Lee",
      "bruce@example.com",
      "+1 555-0122",
      "789 Cedar Rd",
      "Uptown",
      "San Jose",
      "CA",
      "Other",
      "Mouse",
      3,
    ],
  ];

  const [searchValue, setSearchValue] = React.useState("");
  const [genderFilter, setGenderFilter] = React.useState("");
  const [stateFilter, setStateFilter] = React.useState("");
  const [cityFilter, setCityFilter] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleEdit = (idx: number) => {
    console.log("edit row", idx);
    alert(`Edit row #${idx + 1}`);
  };

  const handleDelete = (idx: number) => {
    setSelectedRow(idx);
    setConfirmOpen(true);
  };

  const handleClearFilters = () => {
    setGenderFilter("");
    setStateFilter("");
    setCityFilter("");
  };

  const handleExport = (format: "pdf" | "word") => {
    console.log(
      `Exporting ${selectedRows.length} rows as ${format.toUpperCase()}`
    );
    console.log("Selected row indices:", selectedRows);
    console.log(
      "Selected data:",
      selectedRows.map((idx) => data[idx])
    );
    alert(
      `Export functionality for ${format.toUpperCase()} format will be implemented here. Selected ${
        selectedRows.length
      } row(s).`
    );
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const stateOptions = [
    { label: "WA", value: "WA" },
    { label: "TX", value: "TX" },
    { label: "CA", value: "CA" },
  ];

  const cityOptions = [
    { label: "Seattle", value: "Seattle" },
    { label: "Austin", value: "Austin" },
    { label: "San Jose", value: "San Jose" },
  ];

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <FilterBar
        searchComponent={
          <Search
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search..."
          />
        }
        filters={[
          {
            label: "Gender",
            key: "gender",
            options: genderOptions,
            value: genderFilter,
            onChange: setGenderFilter,
          },
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
        data={data}
        onEditRow={handleEdit}
        onDeleteRow={handleDelete}
        enableSelection={true}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        exportMenu={
          <ExportMenu
            selectedRows={selectedRows}
            totalRows={data.length}
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
          onConfirm={() => {
            console.log("deleted row", selectedRow);
            setConfirmOpen(false);
            setSelectedRow(null);
          }}
          title="Confirm delete"
          description={`Are you sure you want to delete this record${
            selectedRow !== null ? ` #${selectedRow + 1}` : ""
          }? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

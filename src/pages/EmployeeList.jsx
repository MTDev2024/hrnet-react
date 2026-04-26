import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEmployeeStore } from "../store/employeeStore";

const columnHelper = createColumnHelper();

function EmployeeList() {
  const employees = useEmployeeStore((state) => state.employees);
  const columns = [
    columnHelper.accessor("firstName", { header: "First Name" }),
    columnHelper.accessor("lastName", { header: "Last Name" }),
    columnHelper.accessor("dateOfBirth", {
      header: "Date of Birth",
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString("en-US");
      },
    }),
    columnHelper.accessor("startDate", {
      header: "Start Date",
      cell: (info) => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString("en-US");
      },
    }),
    columnHelper.accessor("street", { header: "Street" }),
    columnHelper.accessor("city", { header: "City" }),
    columnHelper.accessor("state", { header: "State" }),
    columnHelper.accessor("zipCode", { header: "Zip Code" }),
    columnHelper.accessor("department", { header: "Department" }),
  ];

  const [globalFilter, setGlobalFilter] = useState("");

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <main className="max-w-7xl whitespace-nowrap mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Employee List
      </h1>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 placeholder-gray-500"
      />

      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="hover:bg-gray-50">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " ↑"
                    : header.column.getIsSorted() === "desc"
                      ? " ↓"
                      : " ↕"}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 text-sm text-gray-800 border-b"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 text-sm bg-slate-600 text-white rounded-md hover:bg-slate-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} sur{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 text-sm bg-slate-600 text-white rounded-md hover:bg-slate-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default EmployeeList;

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
    columnHelper.accessor("dateOfBirth", { header: "Date of Birth" }),
    columnHelper.accessor("startDate", { header: "Start Date" }),
    columnHelper.accessor("street", { header: "Street" }),
    columnHelper.accessor("city", { header: "City" }),
    columnHelper.accessor("state", { header: "State" }),
    columnHelper.accessor("zipCode", { header: "Zip Code" }),
    columnHelper.accessor("department", { header: "Department" }),
  ];

  const [globalFilter, setGlobalFilter] = useState("");

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

  console.log(employees);

  return (
    <>
      <input
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
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
        >
          Next
        </button>
      </div>
    </>
  );
}

export default EmployeeList;

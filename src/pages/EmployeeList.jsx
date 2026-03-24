import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  flexRender,
  getSortedRowModel,
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

  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  console.log(employees);

  return (
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
  );
}

export default EmployeeList;

import React, { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel, // <-- Add this import
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import "./BasicTable.css";
import PageHeader from "./PageHeader";
import ExpendedTr from "./ExpendedTr";

//const columnHelper = createColumnHelper();

const BasicTable = ({ data, columns, filtering, setFiltering }) => {
  const [expanded, setExpanded] = useState({});
  console.log(expanded);
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // sorting row model
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    // Filter row model
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    // Expand row model
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
    // pagination row model
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 5 } },

    state: {
      sorting: sorting,
      globalFilter: filtering,
      expanded: expanded,
    },

  });

  // const {getHeaderGroups, getRowModel, setPageIndex, getPageCount} = table

  return (
    <>
      <section className="table-container">
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: "🔻", desc: "🔺" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <ExpendedTr patient={row.original.patient} />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </section>

      <nav className="pagination">
        <button className="page-btn" onClick={() => table.setPageIndex(0)}>
          {" "}
          ‹‹{" "}
        </button>

        <button
          disabled={!table.getCanPreviousPage()}
          className="page-btn"
          onClick={() => table.previousPage()}
        >
          ‹ Prev
        </button>

        <span>
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          <strong>{table.getPageCount()}</strong>
        </span>

        <button
          disabled={!table.getCanNextPage()}
          className="page-btn"
          onClick={() => table.nextPage()}
        >
          Next ›
        </button>

        <button
          className="page-btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          {" "}
          ››{" "}
        </button>
      </nav>
    </>
  );
};

export default BasicTable;

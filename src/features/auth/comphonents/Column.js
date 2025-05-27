import {
  createColumnHelper, // <-- Add this import
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const COLUMNS = [
      columnHelper.accessor("name", {
        header: "Name",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: info => (
          <span className={`status-badge ${info.getValue()?.toLowerCase()}`}>
            {info.getValue()}
          </span>
        ),
      }),

      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: info => (
          <>
            <button className="btn-outline">Edit</button>
            <button className="btn-outline danger">Delete</button>
          </>
        ),
      }),
    ]
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import { primarycolor } from "./variable";
import { Button } from "@mui/material";

export default function DataTable(props) {
  let columns;
  columns = props.datacolumn || [];
  useEffect(() => {
    // console.log(props.datarow, "tissdis sidnfasdf asidfejtj");
    console.log(props.datacoludmn, "thiskslf slog ");
  }, [props]);
  const rowsWithId = Array.isArray(props.datarow)
    ? props.datarow.map((row, index) => ({
        id: index,
        ...row,
      }))
    : [];
  console.log(props.datacolumn, "this is column of the data");
  return (
    <div style={{ height: 400, maxWidth: "100%" }}>
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        // columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}

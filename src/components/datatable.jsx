import React, { useEffect } from "react";
import { DataGrid, GridDensity } from "@mui/x-data-grid";
import { compact } from "lodash";

// this is the table of all the components that uses normal table
export default function DataTable(props) {
  // if the props.datacolumn is empty then store the empty array else store column
  let columns = props.datacolumn || [];

  // as the props data changes it rerenders the fuction
  useEffect(() => {
    // console.log(props.datarow, "tissdis sidnfasdf asidfejtj");
    console.log(props.datacoludmn, "thiskslf slog ");
  }, [props]);

  // this function add ID to all the object in the array then pass to the DataGrid, because DataGrid requires id to render the array of objects
  const rowsWithId = Array.isArray(props.datarow)
    ? props.datarow.map((row, index) => ({
        id: index,
        ...row,
      }))
    : [];
  console.log(props.datacolumn, "this is column of the data");
  return (
    <div
      style={{
        height: 300,
        minWidth: "100%",
        minHeight: "100vh",
      }}
    >
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        density="compact"
        // columns={columns}
        autoPageSize={true}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}

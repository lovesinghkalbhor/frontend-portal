import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { compact } from "lodash";
import { primarycolor, topbarcolor } from "./variable";
import { Box } from "@mui/material";

// this is the table of all the components that uses normal table
export default function DataTable(props) {
  // if the props.datacolumn is empty then store the empty array else store column
  let [loading, setloading] = useState(true);
  let columns = props.datacolumn || [];

  // as the props data changes it rerenders the fuction
  useEffect(() => {
    let length_of_arr = Array.isArray(props.datarow);
    // if length_of_arr > 0 then stop loading
    if (length_of_arr) {
      setloading(false);
    }
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
    <Box
      style={{
        height: 300,
        minWidth: "100%",
        minHeight: "100vh",
      }}
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {},
        "& .name-column--cell": {
          color: `red !important`,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: `${topbarcolor} !important`,
        },

        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
        },
        "& .MuiCheckbox-root": {
          color: `${primarycolor}  !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${primarycolor}  !important`,
        },
        "& .MuiButtonBase-root ": {
          color: `${primarycolor}  !important`,
        },
      }}
    >
      <DataGrid
        loading={loading}
        rows={rowsWithId}
        columns={columns}
        density="compact"
        autoPageSize={true}
        pageSize={5}
        rowsPerPageOptions={[20]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  );
}

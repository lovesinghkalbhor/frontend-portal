import React, { useContext, useEffect } from "react";
import { Box, Icon, IconButton, Button } from "@mui/material";
import DataTable from "../../components/datatable";
import { primarycolor, shadow } from "../../components/variable";
import { globalcontext } from "../../routes/controler";

export default function Customer() {
  const { matches, is_session_valid } = useContext(globalcontext);
  useEffect(() => {
    is_session_valid();
  });

  return (
    <>
      <Box>
        <Box
          borderRadius="1.2rem"
          // height="50vh"
          backgroundColor="#FFFFFF"
          width={matches ? "95%" : "100%"}
          padding={matches ? "2rem" : "0.5rem"}
          margin={matches ? "0.5rem" : "0rem"}
          boxShadow={shadow}
        >
          <Button
            variant="contained"
            // backgroundColor={primarycolor}
            style={{
              padding: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              color: "white",
              backgroundColor: primarycolor,
              marginBottom: "1rem",
              borderRadius: "0.5rem",
              marginLeft: "1rem",
            }}
          >
            + Add Customer
          </Button>

          <DataTable></DataTable>
        </Box>
      </Box>
    </>
  );
}

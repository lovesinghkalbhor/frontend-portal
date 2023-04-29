import React, { useContext, useEffect } from "react";
import { Box, Icon, IconButton, Button, Grid } from "@mui/material";
import DataTable from "../../components/datatable";
import { primarycolor, shadow } from "../../components/variable";
import { globalcontext } from "../../routes/controler";
export default function Dashboard() {
  const { matches, is_session_valid } = useContext(globalcontext);
  useEffect(() => {
    is_session_valid();
  });
  return (
    <>
      <Box>
        <Grid container spacing={{ xs: 2 }}>
          {/* <Box display="flex" justifyContent="space-around"> */}

          <Grid item xs={12} md={6}>
            <Box
              // width="45%"
              borderRadius="1.2rem"
              height="15rem"
              backgroundColor="#E9EFFD"
              margin={matches ? "1rem" : "0rem"}
              boxShadow={shadow}
            ></Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              // width="45%"
              borderRadius="1.2rem"
              height="15rem"
              backgroundColor="#FFEAE7"
              margin={matches ? "1rem" : "0rem"}
              boxShadow={shadow}
            ></Box>
          </Grid>
        </Grid>
        <Box
          width={matches ? "95%" : "100%"}
          borderRadius="1.2rem"
          // height="50vh"
          backgroundColor="#FFFFFF"
          padding={matches ? "2rem" : "1rem"}
          margin={matches ? "1rem" : "0rem"}
          marginTop={matches ? "0rem" : "4rem"}
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
            Renew domain
          </Button>

          <DataTable></DataTable>
        </Box>
      </Box>
    </>
  );
}

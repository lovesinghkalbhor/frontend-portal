import React, { useContext, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import DataTable from "../../components/datatable";
import {
  primarycolor,
  shadow,
  radius,
  borderTop,
} from "../../components/variable";
import { globalcontext } from "../../routes/controler";
export default function Dashboard() {
  const { is_screen_sm, is_session_valid } = useContext(globalcontext);
  useEffect(() => {
    is_session_valid();
  });
  return (
    <>
      <Box>
        <Grid container spacing={{ xs: 2 }}>
          <Grid item xs={12} md={6}>
            <Box
              borderRadius={radius}
              borderTop={borderTop}
              height="15rem"
              backgroundColor="#E9EFFD"
              margin={is_screen_sm ? "1rem" : "0rem"}
              boxShadow={shadow}
            ></Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              borderRadius={radius}
              borderTop={borderTop}
              height="15rem"
              backgroundColor="#FFEAE7"
              margin={is_screen_sm ? "1rem" : "0rem"}
              boxShadow={shadow}
            ></Box>
          </Grid>
        </Grid>
        <Box
          borderRadius={radius}
          borderTop={borderTop}
          width={is_screen_sm ? "95%" : "100%"}
          backgroundColor="#FFFFFF"
          padding={is_screen_sm ? "2rem" : "1rem"}
          margin={is_screen_sm ? "1rem" : "0rem"}
          marginTop={is_screen_sm ? "3rem" : "0rem"}
          boxShadow={shadow}
        >
          <Button
            variant="contained"
            style={{
              padding: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              color: "white",
              backgroundColor: primarycolor,
              marginBottom: "1rem",
              borderRadius: radius,
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

import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import DataTable from "../../components/datatable";
import { shadow } from "../../components/variable";
import { globalcontext } from "../../routes/controler";

export default function Domain() {
  const { is_screen_sm, is_session_valid } = useContext(globalcontext);
  useEffect(() => {
    is_session_valid();
  });

  return (
    <>
      <Box>
        <Box
          borderRadius="1.2rem"
          backgroundColor="#FFFFFF"
          width={is_screen_sm ? "95%" : "100%"}
          padding={is_screen_sm ? "2rem" : "0.5rem"}
          margin={is_screen_sm ? "0.5rem" : "0rem"}
          boxShadow={shadow}
        >
          <DataTable></DataTable>
        </Box>
      </Box>
    </>
  );
}

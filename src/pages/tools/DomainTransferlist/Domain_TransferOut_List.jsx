import React, { useContext } from "react";
import { Box } from "@mui/material";
import DataTable from "../../../components/datatable";
import { shadow } from "../../../components/variable";
import { globalcontext } from "../../../routes/controler";

export default function DomainTransferList() {
  const { is_screen_sm } = useContext(globalcontext);

  return (
    <>
      <Box>
        <Box
          borderRadius="1.2rem"
          // height="50vh"
          backgroundColor="#FFFFFF"
          width={is_screen_sm ? "95%" : "100%"}
          padding={is_screen_sm ? "2rem" : "0.2rem"}
          margin={is_screen_sm ? "0.5rem" : "0rem"}
          boxShadow={shadow}
        >
          {/* <Button
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
          </Button> */}

          <DataTable></DataTable>
        </Box>
      </Box>
    </>
  );
}

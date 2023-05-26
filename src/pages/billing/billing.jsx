import React, { useContext, useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab, tabsClasses } from "@mui/material";
import {
  shadow,
  primarycolor,
  radius,
  borderTop,
} from "../../components/variable";
import { globalcontext } from "../../routes/controler";
import ListTranscationTab from "./list_transcationTab";
import ListInvoice from "./Listinvoice";
import ViewInvoice from "./ViewInvoiceTab";
import ViewTransaction from "./ViewTransactionTab copy";

export default function Billing() {
  // this destructure the variable and funtion form the globalcontext
  const { is_screen_sm, is_session_valid } = useContext(globalcontext);
  const [value, setValue] = useState("1");
  // this function is used in tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // on render it check if the session is valid or not if not then is_session_valid function redirect to login page
  useEffect(() => {
    is_session_valid();
  }, []);

  return (
    <>
      <Box
        width={is_screen_sm ? "95%" : "100%"}
        // padding={is_screen_sm ? "2rem" : "0.2rem"}
        padding={is_screen_sm ? "1rem" : "0.2rem"}
        margin={is_screen_sm ? "0.5rem" : "0rem"}
        // borderRadius="1.2rem"
        marginTop="2rem"
        backgroundColor="#FFFFFF"
        paddingLeft="0.5rem"
        paddingRight="0.5rem"
        boxShadow={shadow}
        borderRadius={radius}
        // border={`1px solid ${primarycolor}`}
        borderTop={borderTop}
        // border={`1px solid ${primarycolor}`}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              <Tab
                label="List of transcation"
                value="1"
                style={{ color: primarycolor }}
              />
              {/* <Tab label="View Transaction" value="2" /> */}
              <Tab label="Invoice List" value="2" />
              {/* <Tab label="View Invoice" value="4" /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box width="99%" borderRadius="1.2rem" backgroundColor="#FFFFFF">
              <ListTranscationTab></ListTranscationTab>
            </Box>
          </TabPanel>

          <TabPanel value="2">
            <Box>
              <Box width="100%" borderRadius="1.2rem" backgroundColor="#FFFFFF">
                <ListInvoice></ListInvoice>
              </Box>
            </Box>
          </TabPanel>
          {/* <TabPanel value="4">
            <Box>
              <Box width="100%" borderRadius="1.2rem" backgroundColor="#FFFFFF">
                <ViewInvoice></ViewInvoice>
              </Box>
            </Box>
          </TabPanel> */}
        </TabContext>
      </Box>
    </>
  );
}

import React, { useEffect, useContext } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab, tabsClasses } from "@mui/material";
import { primarycolor, shadow } from "../../components/variable";
import AddCostumerTab from "./addCustomerTab";
import SearchDomainTab from "./searchDomainTab";
import DomaintransferTab from "./domaintransferTab";
import { globalcontext } from "../../routes/controler";
export default function PlaceOrders() {
  const [value, setValue] = React.useState("1");
  const { is_screen_sm, userinfo, setuserinfo, is_session_valid } =
    useContext(globalcontext);
  const TabhandleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    is_session_valid();
  });

  return (
    <Box
      sx={{ width: "100%", typography: "body1" }}
      boxShadow={shadow}
      borderRadius="1rem"
      backgroundColor="white"
      padding="1rem"
      paddingTop="2rem"
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={TabhandleChange}
            aria-label="lab API tabs example"
            variant="scrollable"
            scrollButtons="auto"
            // for opacity of scrolled disable button
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <Tab label="Add New costumer" value="1" />
            <Tab label="Search for your Domain" value="2" />
            <Tab label="Domain Transfer" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AddCostumerTab></AddCostumerTab>
        </TabPanel>
        <TabPanel value="2">
          <SearchDomainTab></SearchDomainTab>
        </TabPanel>
        <TabPanel value="3">
          <DomaintransferTab></DomaintransferTab>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

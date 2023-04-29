import React, { useContext } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import { Box } from "@material-ui/core";
import YourHistoryTAB from "./yourHistoryTAB";
import DomainHistoryTAB from "./domainhistoryTab";
import EmailHistoryTAB from "./emailhistoryTAB";
import { globalcontext } from "../../../routes/controler";
import { shadow } from "../../../components/variable";

import {
  TextField,
  InputLabel,
  FormControl,
  Button,
  Box,
  Tab,
  tabsClasses,
} from "@mui/material";
import DataTable from "../../../components/datatable";

export default function Actionhistory() {
  const [value, setValue] = React.useState("1");
  const { matches } = useContext(globalcontext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // defalut tab is 4
  const [value1, setValue1] = React.useState("4");

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };

  return (
    <>
      <Box
        sx={{ width: "100%", typography: "body1" }}
        borderRadius="1.2rem"
        // height="50vh"
        backgroundColor="#FFFFFF"
        width={matches ? "95%" : "100%"}
        margin={matches ? "0.5rem" : "0rem"}
        padding={matches ? "2rem" : "0rem"}
        boxShadow={shadow}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            {/* parent tab on the top  */}
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
              <Tab label="Action history" value="1" />
              <Tab label="Email History" value="2" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            style={{
              margin: "0rem",
              padding: "0rem",
            }}
          >
            {/* child tab for first taboption */}
            <Box sx={{ typography: "body1" }}>
              <TabContext value={value1}>
                <Box
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  width={matches ? "95%" : "100%"}
                  margin={matches ? "0.5rem" : "0rem"}
                  padding={matches ? "1rem" : "0rem"}
                >
                  <TabList
                    onChange={handleChange1}
                    aria-label="lab API tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      [`& .${tabsClasses.scrollButtons}`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                      },
                    }}
                  >
                    <Tab label="Your History" value="4" />
                    <Tab label="Domian History" value="5" />
                  </TabList>
                </Box>
                {/* your history tab  */}
                <TabPanel value="4">
                  <YourHistoryTAB></YourHistoryTAB>
                </TabPanel>
                {/* domain hsitory tab */}
                <TabPanel value="5">
                  <DomainHistoryTAB></DomainHistoryTAB>
                </TabPanel>
              </TabContext>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <EmailHistoryTAB></EmailHistoryTAB>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

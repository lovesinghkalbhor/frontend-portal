import React, { useContext, useEffect } from "react";
import DataTable from "../../components/datatable";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  TextField,
  InputLabel,
  FormControl,
  Button,
  Box,
  Tab,
  tabsClasses,
} from "@mui/material";
import { primarycolor, shadow } from "../../components/variable";
import { globalcontext } from "../../routes/controler";

export default function Billing() {
  const [value, setValue] = React.useState("1");
  const { matches, is_session_valid } = useContext(globalcontext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    is_session_valid();
  });

  return (
    <>
      <Box
        width={matches ? "95%" : "100%"}
        padding={matches ? "2rem" : "0.2rem"}
        //  margin={matches ? "0.5rem" : "0rem"}
        borderRadius="1.2rem"
        backgroundColor="#FFFFFF"
        paddingLeft="0.5rem"
        paddingRight="0.5rem"
        boxShadow={shadow}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
              <Tab label="List of transcation" value="1" />
              <Tab label="Locked Payment" value="2" />
              <Tab label="Archive List of Transaction" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            List of transcation{" "}
            <Box>
              <Box
                width="99%"
                borderRadius="1.2rem"
                backgroundColor="#FFFFFF"

                // boxShadow={shadow}
              >
                {/* <Button
                  variant="contained"
                  //   backgroundColor={primarycolor}
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
          </TabPanel>
          <TabPanel value="2">
            Locked Payment{" "}
            <Box>
              <Box
                width="100%"
                borderRadius="1.2rem"
                // height="50vh"
                backgroundColor="#FFFFFF"
                // padding="2rem"
                // margin="1rem"
                // boxShadow={shadow}
              >
                {/* <Button
                  variant="contained"
                  //   backgroundColor={primarycolor}
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
          </TabPanel>
          <TabPanel value="3">
            Archive List of Transaction
            <Box>
              <Box
                width="100%"
                borderRadius="1.2rem"
                // height="50vh"
                backgroundColor="#FFFFFF"
                // padding="2rem"
                // margin="1rem"
                // boxShadow={shadow}
              >
                {/* <Button
                  variant="contained"
                  backgroundColor={primarycolor}
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
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

import { React, useContext, useState, useEffect } from "react";
import { Box, tabsClasses } from "@mui/material";
import { shadow, radius, borderTop } from "../../components/variable";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Users from "./users tab ";
import OrganizationSetting from "./organization setting tab";
import { globalcontext } from "../../routes/controler";
import { OrgEndpoint } from "../global component/data_fetching_components/org";
import AddUserTab from "./adduserTab";
export default function OrganizationPage() {
  const [value, setValue] = useState("1");
  const { is_screen_sm, is_session_valid, setorgdata, seterrormessage } =
    useContext(globalcontext);

  const tabhandleChange = (event, newValue) => {
    setValue(newValue);
  };
  // on render it check if the session is valid or not if not then is_session_valid function redirect to login page
  async function getorgdata() {
    let a = await OrgEndpoint();
    if (a.status === 1) {
      setorgdata(a.organization);
    } else if (a.servererror) {
      seterrormessage(a.servererror);
    }
  }
  useEffect(() => {
    is_session_valid();
    getorgdata();
  }, []);

  return (
    <Box
      width="100%"
      backgroundColor="white"
      marginTop="2rem"
      boxShadow={shadow}
      borderRadius={radius}
      borderTop={borderTop}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={tabhandleChange}
            aria-label="lab API tabs example"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            <Tab label="Organization" value="1" />
            <Tab label="Users" value="2" />
            <Tab label="Add User" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <OrganizationSetting></OrganizationSetting>
        </TabPanel>
        <TabPanel value="2">
          <Users screenSize={is_screen_sm}></Users>
        </TabPanel>
        <TabPanel value="3">
          <AddUserTab screenSize={is_screen_sm}></AddUserTab>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

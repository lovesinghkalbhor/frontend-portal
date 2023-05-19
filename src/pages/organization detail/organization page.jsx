import { React, useContext, useState, useEffect, createContext } from "react";
import { Box, tabsClasses } from "@mui/material";
import { shadow } from "../../components/variable";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Users from "./users tab ";
import SearchUserTab from "./searchUserTab";
import OrganizationSetting from "./organization setting tab";
import { globalcontext } from "../../routes/controler";
import { OrgEndpoint } from "../global component/data_fetching_components/org";
import UpdateUser from "./updateUserTab";

// const orgcontext = createContext();

// import validationSchema from "./index";
export default function OrganizationPage() {
  const [value, setValue] = useState("1");
  // const [orgdata, setorgdata] = useState({});

  // context for media query
  const { is_screen_sm, is_session_valid, orgdata, setorgdata } =
    useContext(globalcontext);

  const tabhandleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getorgdata() {
    let a = await OrgEndpoint();

    if (a.status === 1) {
      setorgdata(a.organization);
    }
  }

  useEffect(() => {
    is_session_valid();
    getorgdata();
  }, []);

  return (
    <Box>
      {/* <orgcontext.Provider
        value={{
          orgdata,
          setorgdata,
        }}
      > */}
      <Box
        width="95%"
        backgroundColor="white"
        // margin="1rem"
        // marginRight="2rem"
        boxShadow={shadow}
        borderRadius="1rem"
        height="100%"
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={tabhandleChange}
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
              <Tab label="Organization" value="1" />
              <Tab label="Users" value="2" />
              <Tab label="Search User" value="3" />
              <Tab label="Update user" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <OrganizationSetting></OrganizationSetting>
          </TabPanel>
          <TabPanel value="2">
            <Users screenSize={is_screen_sm}></Users>
          </TabPanel>
          <TabPanel value="3">
            <SearchUserTab></SearchUserTab>
          </TabPanel>
          <TabPanel value="4">
            <UpdateUser></UpdateUser>
          </TabPanel>
        </TabContext>
      </Box>
      {/* </orgcontext.Provider> */}
    </Box>
  );
}
// export { orgcontext };

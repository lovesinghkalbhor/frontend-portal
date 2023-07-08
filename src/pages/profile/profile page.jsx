import { React, useContext, useState, useEffect } from "react";
import {
  Avatar,
  Stack,
  Box,
  Button,
  TextField,
  Grid,
  tabsClasses,
  Switch,
} from "@mui/material";
import Spinner from "react-bootstrap/Spinner";

import { shadow, radius, borderTop } from "../../components/variable";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { primarycolor } from "../../components/variable";
import Password_Tab from "./password tab ";
import Domain_Pricing_Tab from "./Domain pricing tab";
import Pannel_Setting from "./pannel setting";
import Api_Tab from "./api tab";
import Profile_Tab from "./profile tab";
import { globalcontext } from "../../routes/controler";
import { updateprofiledata } from "../global component/data_fetching_components/me_endpoint";
import { useFormik } from "formik";
// import validationSchema from "./index";
export default function Profile() {
  const [value, setValue] = useState("1");
  const [loading, setloading] = useState(false);

  const [ismodify, setismodify] = useState(false);
  const [error, seterror] = useState(false);
  // context for media query
  const {
    is_screen_sm,
    userinfo,
    setuserinfo,
    servererror,
    setservererror,
    is_session_valid,
    setsuccessmessage,
    seterrormessage,
  } = useContext(globalcontext);

  const tabhandleChange = (event, newValue) => {
    setValue(newValue);
  };
  // formik here is
  // console.log(userinfo.firstName, userinfo.lastName, "in last nae amd ");

  const initialValues = {
    // firstname: userinfo.firstName, // Set default value to empty string if userinfo.firstName is undefined
    firstname: "",
    lastname: "",
    email: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      // validationSchema,
      onSubmit: async (values) => {
        setloading(true);
        setismodify(!ismodify);
        try {
          console.log("in the update lvoe saveasdf");
          let updateddata = await updateprofiledata(
            values.firstname,
            values.lastname,
            values.email
          );
          console.log(updateddata.userinfo, "this si sis sisis sisisi");
          if (updateddata.status === 1) {
            setloading(loading);
            setismodify(!ismodify);
            setuserinfo(updateddata.userinfo);
            setsuccessmessage("User data has been updated successfully");
            setservererror(false);
          } else if (updateddata.servererror) {
            seterrormessage(updateddata.servererror);
          } else {
            setservererror(updateddata.error);
            console.log(error, "this is lerror");
            // alert(error);
          }

          console.log(values, "called data update");
        } catch (error) {
          console.log(error);
        }
      },
    });

  useEffect(() => {
    // it sets the input value after fetchform the api
    if (userinfo.first_name && userinfo.last_name && userinfo.email) {
      setValues({
        ...values,
        firstname: userinfo.first_name,
        lastname: userinfo.last_name,
        email: userinfo.email,
      });
    }
    is_session_valid();
  }, [userinfo]);

  return (
    <Box>
      {/* {is_screen_sm ? ( */}
      <Box
        display="flex"
        width="95%"
        // style={{ border: `1px solid ${primarycolor}` }}
        backgroundColor="white"
        marginBottom="2rem"
        marginTop="2rem"
        boxShadow={shadow}
        borderRadius={radius}
        // border={`1px solid ${primarycolor}`}
        borderTop={borderTop}
        justifyContent="space-between"
        paddingTop="1rem"
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{ alignItems: "start", justifyContent: "center" }}
          padding="1rem"
          paddingLeft="2rem"
        >
          <Avatar
            alt="Remy Sharp"
            // src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <form // method="POST"
            className="form d-flex flex-column text-start "
            onSubmit={handleSubmit}
          >
            {" "}
            <Stack
              direction="row"
              spacing={4}
              sx={{ alignItems: "start" }}
              padding="1rem"
              paddingLeft="2rem"
            >
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} xl={4}>
                    <TextField
                      id="firstname-input"
                      label="Firstname"
                      variant="outlined"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      disabled={!ismodify}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      style={{ width: "100%", marginBottom: "1rem" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} xl={4}>
                    <TextField
                      id="lastname-input"
                      label="Lastname"
                      variant="outlined"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      disabled={!ismodify}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      style={{ width: "100%", marginBottom: "1rem" }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} xl={4}>
                    <TextField
                      style={{ width: "100%", marginBottom: "1rem" }}
                      id="email-input"
                      label="Email Address"
                      name="email"
                      variant="outlined"
                      disabled={!ismodify}
                      value={values.email}
                      error={!!servererror}
                      helperText={servererror}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />{" "}
                  </Grid>
                </Grid>
                <Box>
                  <Button
                    variant="contained"
                    // type="submit"
                    onClick={() => setismodify(!ismodify)}
                    style={{
                      margin: "1rem",
                      marginLeft: 0,
                      padding: "0.5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      color: "white",
                      backgroundColor: primarycolor,
                      marginBottom: "1rem",
                      borderRadius: radius,
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!ismodify}
                    // onClick={() => setismodify(!ismodify)}
                    style={{
                      margin: "1rem",
                      padding: "0.5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      color: "white",
                      backgroundColor: primarycolor,
                      marginBottom: "1rem",
                      borderRadius: radius,
                    }}
                  >
                    {!loading ? (
                      "Update"
                    ) : (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                  </Button>
                </Box>
              </Box>
            </Stack>
          </form>
        </Stack>

        {/* switch for allowing modifying */}
        {/* <Box margin="2rem">
          <h5>Modify</h5>
          <Switch
            color="secondary"
            onChange={() => setismodify(!ismodify)}
          ></Switch>
        </Box> */}
      </Box>
      {/* ) : null} */}
      <Box
        width="95%"
        backgroundColor="white"
        // margin="1rem"
        // marginRight="2rem"
        borderRadius={radius}
        // border={`1px solid ${primarycolor}`}
        borderTop={borderTop}
        boxShadow={shadow}
        // borderRadius="1rem"
        height="100%"
      >
        {" "}
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
              <Tab label="Profile" value="0" />
              <Tab label="Password" value="1" />
              <Tab label="Domain Pricing" value="2" />
              <Tab label="Branding" value="3" />
              <Tab label="pannel setting" value="4" />
              <Tab label="API" value="5" />
            </TabList>
          </Box>
          <TabPanel value="0">
            <Profile_Tab></Profile_Tab>
          </TabPanel>
          <TabPanel value="1">
            <Password_Tab screenSize={is_screen_sm}></Password_Tab>
          </TabPanel>
          <TabPanel value="2">
            <Domain_Pricing_Tab screenSize={is_screen_sm}></Domain_Pricing_Tab>
          </TabPanel>
          <TabPanel value="3">
            {/* <Pannel_Setting></Pannel_Setting> */}
            not complete yet...
          </TabPanel>
          <TabPanel value="4">
            <Pannel_Setting screenSize={is_screen_sm}></Pannel_Setting>
          </TabPanel>
          <TabPanel value="5">
            <Api_Tab screenSize={is_screen_sm}></Api_Tab>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

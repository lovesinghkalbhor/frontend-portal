import { React, useContext, useState, useEffect } from "react";
import {
  Avatar,
  Stack,
  Box,
  Divider,
  Button,
  TextField,
  Grid,
  tabsClasses,
  Switch,
} from "@mui/material";
import { shadow } from "../../components/variable";
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

  const [ismodify, setismodify] = useState(false);
  const [error, seterror] = useState(false);
  // context for media query
  const {
    matches,
    userinfo,
    setuserinfo,
    servererror,
    setservererror,
    is_session_valid,
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
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema,
    onSubmit: async (values) => {
      try {
        console.log("in the update lvoe saveasdf");
        let updateddata = await updateprofiledata(
          values.firstname,
          values.lastname,
          values.email
        );
        console.log(updateddata.userinfo, "this si sis sisis sisisi");
        if (updateddata.status === 1) {
          setuserinfo(updateddata.userinfo);
          setservererror(false);
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
      {matches ? (
        <Box
          width="95%"
          backgroundColor="white"
          marginBottom="2rem"
          marginTop="2rem"
          boxShadow={shadow}
          borderRadius="1rem"
          display="flex"
          justifyContent="space-between"
          paddingTop="1rem"
        >
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
              <Avatar
                alt="Remy Sharp"
                // src="/static/images/avatar/1.jpg"
                sx={{ marginTop: "1rem", width: 100, height: 100 }}
              />
              <Box>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField
                      id="firstname-input"
                      label="firstname"
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
                  <Grid item sm={6}>
                    <TextField
                      id="lastname-input"
                      label="lastname"
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
                </Grid>
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
                />
                {ismodify ? (
                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={() => {
                    //   console.log("this is lveo");
                    // }}
                    style={{
                      padding: "0.5rem",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      color: "white",
                      backgroundColor: primarycolor,
                      marginBottom: "1rem",
                      borderRadius: "0.5rem",
                    }}
                  >
                    Save
                  </Button>
                ) : null}
              </Box>
            </Stack>
          </form>
          {/* switch for allowing modifying */}
          <Box margin="2rem">
            <h5>Modify</h5>
            <Switch
              color="secondary"
              onChange={() => setismodify(!ismodify)}
            ></Switch>
          </Box>
        </Box>
      ) : null}
      <Box
        width="95%"
        backgroundColor="white"
        // margin="1rem"
        // marginRight="2rem"
        boxShadow={shadow}
        borderRadius="1rem"
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
            <Password_Tab screenSize={matches}></Password_Tab>
          </TabPanel>
          <TabPanel value="2">
            <Domain_Pricing_Tab screenSize={matches}></Domain_Pricing_Tab>
          </TabPanel>
          <TabPanel value="3">
            {/* <Pannel_Setting></Pannel_Setting> */}
            not complete yet...
          </TabPanel>
          <TabPanel value="4">
            <Pannel_Setting screenSize={matches}></Pannel_Setting>
          </TabPanel>
          <TabPanel value="5">
            <Api_Tab screenSize={matches}></Api_Tab>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

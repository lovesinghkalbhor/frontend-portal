import { React, useContext, useState, useEffect } from "react";
import {
  Avatar,
  Stack,
  Box,
  Button,
  TextField,
  Grid,
  FormHelperText,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from "react-router-dom";
import validationSchema from "../global component/schema for validation";
import { shadow, radius, borderTop } from "../../components/variable";
import { Reset_password } from "../global component/data_fetching_components/auth";
import { primarycolor } from "../../components/variable";
import { Send_reset_email } from "../global component/data_fetching_components/auth";
import { globalcontext } from "../../routes/controler";
import { useFormik } from "formik";
import Spinner from "react-bootstrap/Spinner";

export default function ChangePassword() {
  let vcodeParam, vcode2Param, emailParam;
  const navigate = useNavigate();
  const [message, setmessage] = useState(false);
  const [parmsdata, setparamsdata] = useState({
    vcode: false,
    vcode2: false,
    email: false,
  });
  const [ismodify, setismodify] = useState(true);
  const [loading, setloading] = useState(false);

  const [error, seterror] = useState(false);
  // context for media query
  const {
    logout,
    setsuccessmessage,
    servererror,
    setservererror,
    is_session_valid,
    is_screen_sm,
  } = useContext(globalcontext);

  // formik here is

  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
    password: "",
    email: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: async (values) => {
        setloading(true);
        setismodify(!ismodify);
        if (parmsdata.vcode) {
          setpassword(
            parmsdata.vcode,
            parmsdata.vcode2,
            parmsdata.email,
            values.password
          );
          console.log(
            parmsdata.vcode,
            parmsdata.vcode2,
            parmsdata.email,
            values.password
          );
        } else {
          isemailcorrect(values);
        }
      },
    });

  async function isemailcorrect(values) {
    try {
      console.log("in the update lvoe saveasdf");
      let updateddata = await Send_reset_email(values.email);
      console.log(updateddata.userinfo, "this si sis sisis sisisi");
      if (updateddata.status === 1) {
        setservererror(false);
        setloading(false);
        setmessage(updateddata.message);
        setsuccessmessage(updateddata.message);
      } else {
        setloading(false);
        setservererror(updateddata.error);
        setmessage(false);
        console.log(error, "this is lerror");
        // alert(error);
      }

      console.log(values, "called data update");
    } catch (error) {
      console.log(error);
    }
  }
  async function setpassword(vcode, vcode2, email, password) {
    try {
      console.log("in the update lvoe saveasdf");
      let updateddata = await Reset_password(vcode, vcode2, email, password);

      if (updateddata.status === 1) {
        setservererror(false);
        setmessage(updateddata.message);
        console.log(updateddata, "this is reset message");
        setsuccessmessage(updateddata.message);
        setTimeout(() => {
          // navigate("/login");
          logout();
        }, 2000);
      } else {
        setservererror(updateddata.error);
        setmessage(false);
        console.log(error, "this is lerror");
        // alert(error);
      }

      console.log(values, "called data update");
    } catch (error) {
      setservererror(error);
      console.log(error);
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    vcodeParam = searchParams.get("vcode");
    vcode2Param = searchParams.get("vcode2");
    emailParam = searchParams.get("email");
    console.log(
      vcodeParam,
      "vcodeParam",
      vcode2Param,

      "vcodeParam",
      emailParam,
      "emailParam"
    );
    setparamsdata({
      vcode: vcodeParam ? vcodeParam : false,
      vcode2: vcode2Param ? vcode2Param : false,
      email: emailParam ? emailParam : false,
    });
    is_session_valid();
  }, []);

  return (
    <Box
      width="100%"
      backgroundColor="white"
      marginBottom="2rem"
      marginTop="2rem"
      boxShadow={shadow}
      borderRadius={radius}
      borderTop={borderTop}
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
          {!parmsdata.vcode ? (
            <Avatar
              alt="Remy Sharp"
              sx={{ marginTop: "1rem", width: 100, height: 100 }}
            />
          ) : null}
          <Box>
            <FormHelperText disabled={message}>{message}</FormHelperText>
            <Grid container>
              {parmsdata.vcode ? (
                <>
                  <Box>
                    <Box>
                      <Box>
                        <Box component="h3" margin="1rem">
                          Password
                        </Box>
                        <form>
                          <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                              <TextField
                                id="Current-input"
                                label="New password"
                                variant="outlined"
                                name="password"
                                error={!!servererror}
                                helperText={servererror}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                style={{ width: "100%", margin: "0.5rem" }}
                              />
                            </Grid>
                          </Grid>
                        </form>
                      </Box>
                    </Box>
                    <Box maxWidth={is_screen_sm ? "80%" : "100%"}>
                      {" "}
                      <Box component="h4" margin="1rem">
                        {" "}
                        Password policy
                      </Box>
                      <Box marginLeft={is_screen_sm ? "1ren" : "-1rem"}>
                        <List>
                          <ListItem>
                            <ListItemIcon>
                              <FiberManualRecordIcon fontSize="1rem"></FiberManualRecordIcon>
                            </ListItemIcon>
                            Password must be at least 8 characters long.
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <FiberManualRecordIcon fontSize="1rem"></FiberManualRecordIcon>
                            </ListItemIcon>
                            Password should contain different types of
                            characters, including uppercase letters, lowercase
                            letters, numbers and special characters.
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <FiberManualRecordIcon fontSize="1rem"></FiberManualRecordIcon>
                            </ListItemIcon>
                            Password should not be same or ,part of the name.
                          </ListItem>
                          ,
                        </List>
                      </Box>
                    </Box>
                  </Box>
                </>
              ) : null}
              <Grid item xs={12}>
                {!parmsdata.vcode ? (
                  <TextField
                    style={{
                      marginBottom: "1rem",
                      marginTop: "1rem",
                    }}
                    id="email-input"
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    variant="outlined"
                    value={values.email}
                    error={(touched.email && errors.email) || null}
                    helperText={errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                ) : null}
              </Grid>
            </Grid>

            {/* <Button
              variant="contained"
              type="submit"
              style={{
                padding: "0.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                color: "white",

                // marginLeft: "rem",
                backgroundColor: primarycolor,
                marginBottom: "1.5rem",
                borderRadius: "0.5rem",
                borderRadius: radius,
              }}
            >
              Save
            </Button> */}

            <Button
              variant="contained"
              type="submit"
              disabled={!ismodify}
              on
              style={{
                // margin: "1rem",
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
                "Save"
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
        </Stack>
      </form>
      {/* switch for allowing modifying */}
    </Box>
  );
}

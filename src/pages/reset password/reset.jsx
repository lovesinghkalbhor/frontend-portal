import { React, useContext, useState, useEffect } from "react";
import {
  Avatar,
  Stack,
  Box,
  Button,
  TextField,
  Grid,
  FormHelperText,
} from "@mui/material";
import { shadow } from "../../components/variable";
import { Reset_password } from "../global component/data_fetching_components/auth";
import { primarycolor } from "../../components/variable";
import { Send_reset_email } from "../global component/data_fetching_components/auth";
import { globalcontext } from "../../routes/controler";
import { useFormik } from "formik";
export default function ChangePassword() {
  const [message, setmessage] = useState(false);
  const [parmsdata, setparamsdata] = useState({
    vcode: false,
    vcode2: false,
    email: false,
  });
  let vcodeParam, vcode2Param, emailParam;

  const [error, seterror] = useState(false);
  // context for media query
  const { servererror, setservererror, is_session_valid } =
    useContext(globalcontext);

  // formik here is

  const initialValues = {
    // firstname: userinfo.firstName, // Set default value to empty string if userinfo.firstName is undefined
    password: "",
    email: "",
  };
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    // validationSchema,
    onSubmit: async (values) => {
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
          values.password,
          "5555555555555555550000000000000000000000000"
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
        setmessage(updateddata.message);
      } else {
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
        setTimeout(() => {
          alert("navigated to the link");
        }, 2000);
      } else {
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
            <FormHelperText disabled={message}>{message}</FormHelperText>
            <Grid container>
              {parmsdata.vcode ? (
                <Grid item xs={12}>
                  <TextField
                    id="Current-input"
                    label="password"
                    variant="outlined"
                    name="password"
                    error={!!servererror}
                    helperText={servererror}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />
                </Grid>
              ) : null}
              <Grid item xs={12}>
                {!parmsdata.vcode ? (
                  <TextField
                    style={{
                      width: "100%",
                      marginBottom: "1rem",
                      marginTop: "1rem",
                    }}
                    id="email-input"
                    label="Email Address"
                    name="email"
                    variant="outlined"
                    //   disabled={!ismodify}
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
                ) : null}
              </Grid>
            </Grid>

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
          </Box>
        </Stack>
      </form>
      {/* switch for allowing modifying */}
    </Box>
  );
}

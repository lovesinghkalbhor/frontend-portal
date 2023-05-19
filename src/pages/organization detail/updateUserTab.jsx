import { React, useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Switch,
  Stack,
  Avatar,
} from "@mui/material";
import { primarycolor, shadow } from "../../components/variable";
import { useFormik } from "formik";
import { EditUser } from "../global component/data_fetching_components/org";
import { globalcontext } from "../../routes/controler";
export default function UpdateUser() {
  const [ismodify, setismodify] = useState(false);
  const {
    orgdata,
    setorgdata,
    is_screen_sm,
    servererror,
    is_session_valid,
    successmessage,

    setservererror,
    setsuccessmessage,
  } = useContext(globalcontext);
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // formik here is

  const initialValues = {
    // firstname: userinfo.firstName, // Set default value to empty string if userinfo.firstName is undefined
    first_name: "",
    last_name: "",
    email: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        console.log(orgdata.org_id, "hereis the org data that apperarsfsdf");
        let a = await EditUser(orgdata.org_id, values, user.email);
        if (a.status === 1) {
          setservererror(false);
          setsuccessmessage(a.description);
          setValues({
            ...values,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          });
        } else {
          setservererror(a.error);
          // alert(error);
        }

        console.log(values, "called data update");
      },
    });
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    let first_name = searchParams.get("first_name");
    let last_name = searchParams.get("last_name");
    let email = searchParams.get("email");
    console.log(first_name, last_name, email);
    setuser({
      first_name: first_name,
      last_name: last_name,
      email: email,
    });
    is_session_valid();
  }, []);

  useEffect(() => {
    if (user.first_name && user.last_name) {
      setValues({
        ...values,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  return (
    <Box>
      {is_screen_sm ? (
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
                      name="first_name"
                      value={values.first_name}
                      onChange={handleChange}
                      disabled={!ismodify}
                      onBlur={handleBlur}
                      error={!!servererror}
                      helperText={servererror}
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
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      disabled={!ismodify}
                      onBlur={handleBlur}
                      error={!!servererror}
                      helperText={servererror}
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!servererror}
                  helperText={servererror}
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
    </Box>
  );
}

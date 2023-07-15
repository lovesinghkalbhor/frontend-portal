import { React, useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Grid, Stack, Avatar } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import {
  primarycolor,
  shadow,
  radius,
  borderTop,
} from "../../components/variable";
import validationSchema from "../global component/schema for validation";
import { useFormik } from "formik";
import { EditUser } from "../global component/data_fetching_components/org";
import { globalcontext } from "../../routes/controler";
export default function UpdateUser() {
  const [ismodify, setismodify] = useState(false);
  const [loading, setloading] = useState(false);
  const {
    orgdata,
    servererror,
    is_session_valid,
    setservererror,
    setsuccessmessage,
    seterrormessage,
  } = useContext(globalcontext);
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    org_id: "",
  });

  // formik here is
  const handleFocus = () => {
    setservererror(false);
  };
  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
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
  } = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      let editdata = {
        first_name: values.firstname,
        last_name: values.lastname,
        email: values.email,
      };
      setloading(true);
      setismodify(!ismodify);
      let a = await EditUser(user.org_id, editdata, user.email);
      console.log(a, "called data update");
      if (a.status === 1) {
        setservererror(false);
        setloading(false);

        setsuccessmessage(a.description);
        setValues({
          ...values,
          first_name: user.firstname,
          last_name: user.lastname,
          email: user.email,
        });

        // if something wrong happens
      } else if (a.servererror) {
        seterrormessage(a.servererror);
      } else {
        setloading(false);
        setservererror(a.error);
      }

      // console.log(values, "called data update");
    },
  });
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    let firstname = searchParams.get("first_name");
    let lastname = searchParams.get("last_name");
    let email = searchParams.get("email");
    let org_id = searchParams.get("org");
    console.log(firstname, lastname, email);
    setuser({
      firstname: firstname,
      lastname: lastname,
      email: email,
      org_id,
    });
    is_session_valid();
  }, []);

  useEffect(() => {
    if (user.firstname && user.lastname) {
      setValues({
        ...values,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      });
    }
  }, [user]);

  return (
    <Box>
      <Box
        display="flex"
        width="95%"
        backgroundColor="white"
        marginBottom="2rem"
        marginTop="2rem"
        boxShadow={shadow}
        borderRadius={radius}
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
          <Avatar alt="Remy Sharp" sx={{ width: 100, height: 100 }} />
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
                {/* if server gives error then show */}
                {!!servererror ? (
                  <h6 className="text-danger">{servererror}</h6>
                ) : null}
                {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
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
                      error={!!(touched.firstname && errors.firstname) || null}
                      helperText={errors.firstname}
                      onFocus={handleFocus}
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
                      error={!!(touched.lastname && errors.lastname) || null}
                      helperText={errors.lastname}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onFocus={handleFocus}
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
                      error={!!(touched.email && errors.email) || null}
                      helperText={errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
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
      </Box>
    </Box>
  );
}

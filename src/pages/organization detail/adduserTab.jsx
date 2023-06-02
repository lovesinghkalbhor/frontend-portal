import { React, useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Switch,
  FormControl,
} from "@mui/material";
import { primarycolor, radius } from "../../components/variable";
import { useFormik } from "formik";
import { AddUser } from "../global component/data_fetching_components/org";
import { globalcontext } from "../../routes/controler";
export default function AddUserTab() {
  const [ismodify, setismodify, is_screen_sm] = useState(false);
  const {
    orgdata,
    setorgdata,
    setsuccessmessage,
    is_session_valid,
    seterrormessage,
    setservererror,
  } = useContext(globalcontext);

  // formik here is
  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined

    first_name: "",
    last_name: "",
    email: "",
    password: "",
    org_id: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        let a = await AddUser(orgdata.org_id, values);
        if (a.status === 1) {
          setsuccessmessage("User added successfully");
        } else if (a.status === 0) {
          setservererror(a.error);
        } else if (a.servererror) {
          seterrormessage(a.servererror);
        }
      },
    });

  useEffect(() => {
    is_session_valid();
  }, []);

  return (
    <Box margin={is_screen_sm ? "0rem" : "2rem"} height="85vh">
      <Box display="flex" justifyContent="space-between">
        <h3>Add Costumer</h3>
        <Box>
          <h5>Modify</h5>
          <Switch
            color="secondary"
            onChange={() => setismodify(!ismodify)}
          ></Switch>
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="name-input"
              label="First Name"
              variant="outlined"
              name="first_name"
              value={values.first_name || " "}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              disabled={!ismodify}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="address1-input"
              label="Last Name"
              variant="outlined"
              name="last_name"
              value={values.last_name || " "}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              disabled={!ismodify}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="address2-input"
              label="Email Address"
              variant="outlined"
              name="email"
              value={values.email || " "}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              disabled={!ismodify}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="city-input"
              label="Password"
              variant="outlined"
              name="password"
              value={values.password || " "}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              disabled={!ismodify}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="start">
          {ismodify ? (
            <Button
              variant="contained"
              type="submit"
              style={{
                padding: "0.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                color: "white",
                backgroundColor: primarycolor,
                marginBottom: "1rem",
                borderRadius: radius,
              }}
            >
              Add Customer
            </Button>
          ) : null}
        </Box>
      </form>
    </Box>
  );
}

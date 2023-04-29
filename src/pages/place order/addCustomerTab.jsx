import * as React from "react";

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
  Grid,
  tabsClasses,
} from "@mui/material";
import { primarycolor, shadow } from "../../components/variable";
import { useFormik } from "formik";

export default function AddCostumerTab() {
  const [value, setValue] = React.useState("1");

  const TabhandleChange = (event, newValue) => {
    setValue(newValue);
  };

  const initialValues = {
    // firstname: userinfo.firstName, // Set default value to empty string if userinfo.firstName is undefined
    name: "",
    email: "",
    password: "",
    company_name: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values) => {
        console.log(values);
        // let a = updateprofiledata(
        //   values.firstname,
        //   values.lastname,
        //   values.email
        // );

        console.log(values, "called data update");
      },
    });

  // it is usefull dont erase it for now i have commented it
  //   useEffect(() => {
  //     // it sets the input value after fetchform the api
  //     if (userinfo.firstName && userinfo.lastName && userinfo.email) {
  //       setValues({
  //         ...values,
  //         name: userinfo.name,
  //         company_name: userinfo.lastName,
  //         email: userinfo.email,
  //       });
  //     }
  //   }, [userinfo]);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      // width="100%"
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="name-input"
              label="name"
              variant="outlined"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="email-input"
              label="email"
              variant="outlined"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="password-input"
              label="password"
              variant="outlined"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="company-input"
              label="company"
              variant="outlined"
              name="company_name"
              value={values.company_name}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="phone-input"
              label="phone"
              variant="outlined"
              name="phone_number"
              value={values.phone_number}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="address-input"
              label="address"
              variant="outlined"
              name="Address"
              value={values.address}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="city-input"
              label="city"
              variant="outlined"
              name="city"
              value={values.city}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="state-input"
              label="state"
              variant="outlined"
              name="state"
              value={values.state}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="country-input"
              label="country"
              variant="outlined"
              name="country"
              value={values.country}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="pincode-input"
              label="pincode"
              variant="outlined"
              name="pincode"
              value={values.pincode}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="start">
          <Button
            type="submit"
            variant="contained"
            style={{
              padding: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              color: "white",
              backgroundColor: primarycolor,
              marginBottom: "1rem",
              borderRadius: "0.5rem",
              margin: "2rem",
              marginLeft: "1rem",
            }}
          >
            Save
          </Button>{" "}
          {/* <Button
            variant="contained"
            style={{
              padding: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              color: "white",
              backgroundColor: "gray",
              marginBottom: "1rem",
              borderRadius: "0.5rem",
              margin: "2rem",
            }}
          >
            Cancel
          </Button> */}
        </Box>
      </form>
    </Box>
  );
}

import React, { useContext, useEffect } from "react";

import { TextField, Button, Box, Grid } from "@mui/material";
import { primarycolor, radius } from "../../components/variable";
import { useFormik } from "formik";
import { globalcontext } from "../../routes/controler";

export default function AddCostumerTab() {
  const [value, setValue] = React.useState("1");
  const { is_session_valid } = useContext(globalcontext);

  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
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

        console.log(values, "called data update");
      },
    });
  useEffect(() => {
    is_session_valid();
  }, []);

  return (
    <Box component="form" noValidate autoComplete="off">
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
              borderRadius: radius,
              margin: "2rem",
              marginLeft: "1rem",
            }}
          >
            Save
          </Button>{" "}
        </Box>
      </form>
    </Box>
  );
}

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
import { globalcontext } from "../../routes/controler";
import { updateprofiledata } from "../global component/data_fetching_components/me_endpoint";
import { useFormik } from "formik";

export default function Profile_Tab() {
  const [ismodify, setismodify] = useState(false);
  // context for media query
  const { matches } = useContext(globalcontext);

  // formik here is

  const initialValues = {
    // firstname: userinfo.firstName, // Set default value to empty string if userinfo.firstName is undefined
    name: "",
    company_name: "",
    phone_number: "",
    city: "",
    state: "",
    country: "",
    tax: "",
    pincode: "",
    currency: "",
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
    <Box margin="2rem">
      <Box component="h4" display="flex" justifyContent="space-between">
        <h3>Profile Setting</h3>
        <Box>
          {" "}
          <h5>Modify</h5>
          <Switch
            color="secondary"
            onChange={() => setismodify(!ismodify)}
          ></Switch>
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <TextField
              id="name-input"
              label="name"
              variant="outlined"
              name="name"
              value={values.name}
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
          <Grid item xs={6} md={4}>
            <TextField
              id="company-input"
              label="company"
              variant="outlined"
              name="company_name"
              value={values.company_name}
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
          <Grid item xs={6} md={4}>
            <TextField
              id="phone-input"
              label="phone"
              variant="outlined"
              name="phone_number"
              value={values.phone_number}
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
          <Grid item xs={6} md={4}>
            <TextField
              id="city-input"
              label="city"
              variant="outlined"
              name="city"
              value={values.city}
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
          <Grid item xs={6} md={4}>
            <TextField
              id="state-input"
              label="state"
              variant="outlined"
              name="state"
              value={values.state}
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
          <Grid item xs={6} md={4}>
            <TextField
              id="country-input"
              label="country"
              variant="outlined"
              name="country"
              value={values.country}
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
          <Grid item xs={6} md={4}>
            <TextField
              id="taxid-input"
              label="tax"
              variant="outlined"
              name="tax"
              value={values.tax}
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
          <Grid item xs={6} md={4}>
            <TextField
              id="pincode-input"
              label="pincode"
              variant="outlined"
              name="pincode"
              value={values.pincode}
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
          <Grid item xs={6} md={4}>
            <TextField
              id="currency-input"
              label="currency"
              variant="outlined"
              name="currency"
              value={values.currency}
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
                borderRadius: "0.5rem",
              }}
            >
              Save
            </Button>
          ) : null}
        </Box>
      </form>
    </Box>
  );
}

import { React, useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Grid, Switch } from "@mui/material";
import { primarycolor } from "../../components/variable";
import { useFormik } from "formik";
import { UpdateOrgData } from "../global component/data_fetching_components/org";
import { orgcontext } from "./organization page";
import { globalcontext } from "../../routes/controler";
export default function OrganizationSetting() {
  const [ismodify, setismodify] = useState(false);
  const { orgdata, setorgdata, setsuccessmessage } = useContext(globalcontext);

  // formik here is

  const initialValues = {
    // firstname: userinfo.firstName, // Set default value to empty string if userinfo.firstName is undefined
    organization_name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        let a = await UpdateOrgData(values);
        if (a.status === 1) {
          setsuccessmessage("Organization data has been updated successfully");
          setorgdata(a.organization);
        }

        console.log(values, "called data update");
      },
    });

  useEffect(() => {
    if (orgdata.name && orgdata.address1) {
      setValues({
        ...values,
        organization_name: orgdata.name,
        address1: orgdata.address1,
        address2: orgdata.address2,
        city: orgdata.city,
        state: orgdata.state,
        country: orgdata.country,
      });
    }
  }, [orgdata]);

  return (
    <Box margin="2rem">
      <Box display="flex" justifyContent="space-between">
        <h3>Organization Setting</h3>
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
          <Grid item xs={6} md={4}>
            <TextField
              id="name-input"
              label="name"
              variant="outlined"
              name="organization_name"
              value={values.organization_name}
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
              id="address1-input"
              label="address1"
              variant="outlined"
              name="address1"
              value={values.address1}
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
              id="address2-input"
              label="address2"
              variant="outlined"
              name="address2"
              value={values.address2}
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
              id="phone-input"
              label="phone"
              variant="outlined"
              name="phone"
              disabled
              value={orgdata.phone}
              style={{ width: "100%", marginBottom: "1rem" }}
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
              name="tax_id"
              disabled
              value={orgdata.tax_id}
              style={{ width: "100%", marginBottom: "1rem" }}
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
              disabled
              value={orgdata.pincode}
              style={{ width: "100%", marginBottom: "1rem" }}
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
              disabled
              value={orgdata.currency}
              style={{ width: "100%", marginBottom: "1rem" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              id="org-input"
              label="org id"
              variant="outlined"
              name="org_id"
              value={orgdata.org_id}
              disabled
              style={{ width: "100%", marginBottom: "1rem" }}
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

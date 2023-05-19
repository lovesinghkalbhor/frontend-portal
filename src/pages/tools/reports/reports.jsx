import React, { useContext } from "react";
import { Box, Button, TextField, MenuItem, Grid } from "@mui/material";

import DataTable from "../../../components/datatable";
import { primarycolor, shadow } from "../../../components/variable";
import { globalcontext } from "../../../routes/controler";
import { useFormik } from "formik";

const currencies = [
  {
    value: "Customer detail report",
  },
  {
    value: "Transaction report",
  },
  {
    value: "Domain report",
  },
  {
    value: "Domain renewal report",
  },
  {
    value: "Action report",
  },
  {
    value: "Domain Transfer-Out report",
  },
];

export default function Reports() {
  const is_screen_sm = useContext(globalcontext);
  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
    report: "",
    email: "",
    start_date: "",
    end_date: "",
  };
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
      // let a = updateprofiledata(
      //   values.firstname,
      //   values.lastname,
      //   values.email
      // );

      console.log(values, "value report");
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
    <>
      <Box
        marginBottom="2rem"
        marginTop="2rem"
        boxShadow={shadow}
        borderRadius="1rem"
        backgroundColor="white"
        padding="1rem"
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={4} maxWidth="1440px">
          <Grid item sm={6} md={3}>
            <TextField
              helperText="Please select your currency"
              select
              // defaultValue="EUR"
              id="currency-input"
              name="report"
              label="Report_Type"
              // defaultValue="Default Value"
              width="100%"
              variant="outlined"
              value={values.report}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              id="currency-input"
              name="email"
              label="Email"
              // defaultValue="Default Value"
              width="100%"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              type="date"
              id="start-date"
              InputLabelProps={{
                shrink: true,
              }}
              name="start_date"
              label="Start Date"
              // defaultValue="Default Value"
              width="100%"
              variant="outlined"
              value={values.start_date}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item sm={6} md={3}>
            <TextField
              type="date"
              id="end-date"
              InputLabelProps={{
                shrink: true,
              }}
              name="end_date"
              label="End Date"
              // defaultValue="Default Value"
              width="100%"
              variant="outlined"
              value={values.end_date}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
            />
          </Grid>
        </Grid>
        <Box
          width={is_screen_sm ? "95%" : "100%"}
          margin={is_screen_sm ? "1rem" : "0rem"}
        >
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
              marginLeft: "1rem",
            }}
          >
            Get Report
          </Button>
          <DataTable></DataTable>
        </Box>
      </Box>
    </>
  );
}

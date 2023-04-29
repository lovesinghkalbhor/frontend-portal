import { React, useContext } from "react";
import { Box, TextField, MenuItem, Divider, Button, Grid } from "@mui/material";
import { primarycolor, shadow } from "../../../components/variable";
import { globalcontext } from "../../../routes/controler";
import { useFormik } from "formik";

const currencies = [
  {
    value: "suspent",
  },
  {
    value: "unsespend",
  },
  {
    value: "Lock",
  },
  {
    value: "Unlock",
  },
  {
    value: "Update",
  },
  {
    value: "Move",
  },
];

export default function BulkActionUpload() {
  const matches = useContext(globalcontext);
  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
    action: "",
    domain: "",
    file: "",
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
      // sx={{
      //   "& .MuiTextField-root": { m: 1, width: "100%" },
      // }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      display="flex"
      justifyContent="space-between"
      // flexWrap="wrap"
      // height="90vh"
      sx={{ width: "100%", typography: "body1" }}
      boxShadow={shadow}
      borderRadius="1rem"
      backgroundColor="white"
      padding="1rem"
      paddingTop="2rem"
    >
      {" "}
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box
            height="90%"
            // margin={matches ? "2rem" : "1rem"}
            width={matches ? "95%" : "100%"}
            margin={matches ? "0.5rem" : "0rem"}
            padding={matches ? "2rem" : "0.3rem"}
            boxShadow={shadow}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            backgroundColor="white"
            borderRadius="1rem"
          >
            {/* selecter field /////////////////////////////////////////////////////// */}
            <TextField
              id="action-input"
              select
              label="Action"
              rows={4}
              cols={5} // defaultValue="Default Value"
              width="100%"
              placeholder="Ex"
              variant="outlined"
              name="action"
              value={values.action}
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
            <Divider
              style={{ height: "1px", backgroundColor: "blue" }}
              light={false}
            />
            {/* Domain field ////////////////////////////////////////////// */}
            <TextField
              id="Domain-input"
              label="Domain"
              multiline
              rows={4}
              cols={5} // defaultValue="Default Value"
              width="100%"
              placeholder="Ex"
              variant="outlined"
              name="domain"
              value={values.domain}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
            />
            <Divider
              style={{ height: "1px", backgroundColor: "blue" }}
              light={false}
            />

            {/* file select field */}
            <Box component="h5" margin="1rem" textAlign="center">
              OR
            </Box>
            <TextField
              type="file"
              name="file"
              value={values.file}
              onChange={handleChange}
              // required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
            />
          </Box>
        </Grid>
        {/* second tab//////////////////////////////////////////////// */}
        <Grid item xs={12} md={6}>
          <Box
            height="90%"
            width={matches ? "95%" : "100%"}
            margin={matches ? "0.5rem" : "0rem"}
            padding={matches ? "2rem" : "0rem"}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            boxShadow={shadow}
            backgroundColor="white"
            borderRadius="1rem"
          >
            <Box paddingTop="2rem">
              <h6>Bulk orders Details</h6>
              <h6>Total Orders</h6>
              <Divider
                style={{
                  height: "1px",
                  backgroundColor: "blue",
                  marginTop: "2rem",
                }}
                light={false}
              ></Divider>
            </Box>
            <Box display="flex">
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
                  margin: "2rem",
                  marginLeft: "1rem",
                }}
              >
                Submit
              </Button>{" "}
              <Button
                variant="contained"
                onClick={resetForm}
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
                Reset
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

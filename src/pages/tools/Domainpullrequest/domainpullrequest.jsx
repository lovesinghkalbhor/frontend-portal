import React from "react";
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
} from "@mui/material";
import { primarycolor, shadow } from "../../../components/variable";
import { useFormik } from "formik";

export default function Domainpullrequest() {
  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
    domain_pull: "",
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
      display="flex"
      justifyContent="center"
      flexDirection="column"
      boxShadow={shadow}
      borderRadius="1rem"
      backgroundColor="white"
      padding="1rem"
      paddingTop="2rem"
    >
      <form onSubmit={handleSubmit}>
        <FormControl noValidate autoComplete="off" style={{ width: "100%" }}>
          <TextField
            id="Domain-input"
            label="Domain pull"
            multiline
            rows={4}
            cols={5} // defaultValue="Default Value"
            placeholder="Ex"
            variant="outlined"
            name="domain_pull"
            value={values.domain_pull}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "1rem" }}
            onBlur={handleBlur}
          />
          <Box display="flex" justifyContent="start">
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
              Save
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
        </FormControl>
      </form>
    </Box>
  );
}

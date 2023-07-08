import React, { useContext, useEffect } from "react";
import { Box, FormControl, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { primarycolor, radius } from "../../components/variable";
import { globalcontext } from "../../routes/controler";

export default function SearchDomainTab() {
  const { is_session_valid } = useContext(globalcontext);
  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
    domain: "",
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
    <>
      <form onSubmit={handleSubmit}>
        <FormControl noValidate autoComplete="off" style={{ width: "100%" }}>
          <Box padding="1rem">
            <TextField
              id="Domain-input"
              label="Domain"
              variant="outlined"
              name="name"
              value={values.domain}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              onBlur={handleBlur}
            />
            <Box>
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
                  margin: "2rem",
                  marginLeft: "0.5rem",
                }}
              >
                Search
              </Button>
            </Box>
          </Box>
        </FormControl>
      </form>
    </>
  );
}

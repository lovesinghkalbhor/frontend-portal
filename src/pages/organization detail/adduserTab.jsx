import { React, useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Grid } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";

import { primarycolor, radius } from "../../components/variable";
import { useFormik } from "formik";
import { AddUser } from "../global component/data_fetching_components/org";
import { globalcontext } from "../../routes/controler";
export default function AddUserTab() {
  const [ismodify, setismodify] = useState(false);
  const [loading, setloading] = useState(false);

  const {
    servererror,
    setsuccessmessage,
    is_session_valid,
    seterrormessage,
    setservererror,
    is_screen_sm,
  } = useContext(globalcontext);

  const OnclickEdit = () => {
    setservererror(false);
  };
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
        setloading(true);
        setismodify(!ismodify);
        let a = await AddUser(1, values);
        if (a.status === 1) {
          setservererror(false);
          setloading(false);
          setsuccessmessage(a.error);
        } else if (a.status === 0) {
          setservererror(a.error);
          setloading(false);
          // if something wrong happens
        } else if (a.servererror) {
          seterrormessage(a.servererror);
          setloading(false);
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

        {!!servererror ? <h6 className="text-danger">{servererror}</h6> : null}
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
              // InputLabelProps={{
              //   shrink: true,
              // }}
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
              // InputLabelProps={{
              //   shrink: true,
              // }}
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
              // InputLabelProps={{
              //   shrink: true,
              // }}
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
              // InputLabelProps={{
              //   shrink: true,
              // }}
            />
          </Grid>
        </Grid>
        <Box>
          <Button
            variant="contained"
            onClick={() => {
              setismodify(!ismodify);
              OnclickEdit();
            }}
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
            on
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
        {/* <Box display="flex" justifyContent="start">
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
        </Box> */}
      </form>
    </Box>
  );
}

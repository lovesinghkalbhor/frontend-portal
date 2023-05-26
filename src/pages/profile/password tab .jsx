import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  List,
  TextField,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
} from "@mui/material";
import { primarycolor } from "../../components/variable";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useFormik } from "formik";
import { globalcontext } from "../../routes/controler";

export default function Password_Tab(props) {
  const { is_session_valid } = useContext(globalcontext);

  useEffect(() => {
    is_session_valid();
  }, []);
  const initialValues = {
    current_password: "",
    new_password: "",
    confirm_password: "",
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

  // useEffect(() => {
  //   // it sets the input value after fetchform the api
  //   if (userinfo.firstName && userinfo.lastName && userinfo.email) {
  //     setValues({
  //       ...values,
  //       firstname: userinfo.firstName,
  //       lastname: userinfo.lastName,
  //       email: userinfo.email,
  //     });
  //   }
  // }, [userinfo]);
  return (
    <>
      {" "}
      <Box>
        <Box>
          <Box>
            <Box component="h5" margin="2rem">
              Password
            </Box>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    id="Current-input"
                    label="Current password"
                    variant="outlined"
                    name="current_password"
                    value={values.current_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    required
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    id="new-input"
                    label="New password"
                    variant="outlined"
                    name="current_password"
                    value={values.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    required
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    id="confirm-input"
                    label="confirm password"
                    variant="outlined"
                    name="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    required
                    style={{ width: "100%", marginBottom: "1rem" }}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
          <Button
            variant="contained"
            style={{
              padding: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              color: "white",
              backgroundColor: primarycolor,
              marginBottom: "1rem",
              borderRadius: "0.5rem",
              margin: "2.1rem",
              marginLeft: "1rem",
            }}
          >
            Save
          </Button>{" "}
        </Box>
        <Box maxWidth={props.screenSize ? "80%" : "100%"}>
          {" "}
          <Box component="h4" margin="2rem">
            {" "}
            Password policy
          </Box>
          <Box marginLeft={props.screenSize ? "1ren" : "-1rem"}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small"></FiberManualRecordIcon>
                </ListItemIcon>
                {/* <ListItemText primary="Single-line item" /> */}
                Password must be at least 8 characters long.
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small"></FiberManualRecordIcon>
                </ListItemIcon>
                {/* <ListItemText primary="Single-line item" /> */}
                Password should contain different types of characters, including
                uppercase letters, lowercase letters, numbers and special
                characters.
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordIcon fontSize="small"></FiberManualRecordIcon>
                </ListItemIcon>
                {/* <ListItemText primary="Single-line item" /> */}
                Password should not be same or ,part of the name.
              </ListItem>
              ,
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
}

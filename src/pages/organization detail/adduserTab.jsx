import { React, useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Grid } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { primarycolor, radius } from "../../components/variable";
import { useFormik } from "formik";
import { AddUser } from "../global component/data_fetching_components/org";
import { globalcontext } from "../../routes/controler";
import OutlinedInput from "@mui/material/OutlinedInput";
import "../global component/css/controler.css";

import FormControl from "@mui/material/FormControl";
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
    user_type: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        console.log(values, "this isthe values from my side ");
        setloading(true);
        setismodify(!ismodify);
        let a = await AddUser(values);
        if (a.status === 1) {
          setservererror(false);
          setloading(false);
          setsuccessmessage(a.description);
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

  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      margin={is_screen_sm ? "0rem" : "2rem"}
      height={is_screen_sm ? "85vh" : "100vh"}
    >
      <Box display="flex" justifyContent="space-between">
        <h3 className="mb-5 ms-2">Add Costumer</h3>

        {!!servererror ? <h6 className="text-danger">{servererror}</h6> : null}
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl
              style={{
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              <InputLabel id="demo-simple-select-helper-label">
                User Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="User Type"
                variant="outlined"
                name="user_type"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                autoWidth
                value={values.user_type}
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
                disabled={!ismodify}
                onChange={handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="billing">Billing</MenuItem>
                <MenuItem value="tech">Tech</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="name-input"
              label="First Name"
              variant="outlined"
              name="first_name"
              value={values.first_name}
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
              value={values.last_name}
              onChange={handleChange}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
              disabled={!ismodify}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              id="address2-input"
              label="Email Address"
              variant="outlined"
              name="email"
              value={values.email}
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
              value={values.password}
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
            className="smallButton"
            variant="contained"
            onClick={() => {
              setismodify(!ismodify);
              OnclickEdit();
            }}
          >
            Edit
          </Button>
          <Button
            className="smallButton"
            variant="contained"
            type="submit"
            disabled={!ismodify}
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
      </form>
    </Box>
  );
}

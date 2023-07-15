import "../login/login.css";
import React, { useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import {
  TextField,
  FormHelperText,
  Box,
  Button,
  InputAdornment,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Logoutallfunction } from "../../global component/data_fetching_components/auth";
import validationSchema from "../../global component/schema for validation/index";
import Spinner from "react-bootstrap/Spinner";
import { globalcontext } from "../../../routes/controler";
function Logoutall() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { logout, setsuccessmessage, seterrormessage } =
    useContext(globalcontext);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [servererror, setservererror] = useState("");

  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
    password: "",
    email: "",
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (parms) => {
      // parms.preventDefault();
      console.log(values.email, values.password);
      let data = await Logoutallfunction(values.email, values.password);
      console.log(data, "this is s");

      if (data.status === 1) {
        setsuccessmessage("loged out Successfully form all the devices");
        logout();
        // Cookies.set("session_id", "");
        // navigate("/login");
      } else if (data.status === 0) {
        setservererror(data.error);
        //for internat errors
      } else if (data.servererror) {
        setloading(false);

        seterrormessage(data.servererror);
      }
    },
  });
  return (
    <Box
      className="full-screen"
      style={{
        overflow: "hidden",
      }}
    >
      <div className="form-box d-flex justify-content-around align-items-center">
        <div className="inner-from-box text-center ">
          <h4>Log out of all sessions</h4>
          <Box marginBottom="1rem">
            {servererror ? (
              <FormHelperText error>{servererror}</FormHelperText>
            ) : null}
          </Box>
          <form
            className="form d-flex flex-column text-start "
            onSubmit={handleSubmit}
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ margin: "10px" }}
            >
              User Email
            </InputLabel>
            <TextField
              id="outlined-error-helper-text"
              name="email"
              type="text"
              placeholder="Email"
              style={{ marginBottom: "1rem" }}
              value={values.email}
              onChange={handleChange}
              error={(touched.email && errors.email) || null}
              helperText={errors.email}
              onBlur={handleBlur}
            />

            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ margin: "10px" }}
            >
              Password
            </InputLabel>
            <FormControl sx={{ m: 0 }} variant="outlined">
              <OutlinedInput
                name="password"
                id="outlined-adornment-password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                error={(touched.password && errors.password) || null}
                onBlur={handleBlur}
                style={{ backgroundColor: "rgb(240 240 240)" }}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Link className="mt-1 text-end fs-6 link ">Forgot password</Link>
            <Button
              className="submit-button inputs"
              type="submit"
              sx={{ borderRadius: "0px" }}
              disabled={loading}
            >
              {!loading ? (
                "Logout"
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
            <div className="text-center mt-3 ">
              <div className="d-flex justify-content-between">
                <hr></hr>
                <h5 className="fw-bold">OR</h5>
                <hr></hr>
              </div>
              <Box>
                Don not want to Logout ?{" "}
                <Link className="sign-link link fs-6" to="/dashboard">
                  Go Back
                </Link>
              </Box>
            </div>
          </form>
        </div>
        <Box
          className="d-md-flex  d-none"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <img
            className=" me-4 "
            src="./meta.png"
            style={{ width: "150px", height: "auto" }}
          />
          <Box maxWidth="40vw" height="70vh">
            <img
              className="mb-4 me-4"
              src="./Frame.svg"
              style={{ width: "80%", height: "auto" }}
            />
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default Logoutall;

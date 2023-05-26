import "./login.css";
import React, { useState, useContext, useEffect } from "react";
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
import { Logindata } from "../../global component/data_fetching_components/auth";
import validationSchema from "../../global component/schema for validation";
import { globalcontext } from "../../../routes/controler";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const { seterrormessage, is_session_valid } = useContext(globalcontext);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const [servererror, setservererror] = useState("");
  const initialValues = {
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
      let data = await Logindata(values.email, values.password);
      console.log(data, "this is s");

      if (data.status === 1) {
        Cookies.set("session_id", data.session_id);
        navigate("/dashboard");
      } else if (data.status === 0) {
        setservererror(data.error);
      } else if (data.servererror) {
        seterrormessage(data.servererror);
      }
    },
  });

  // useEffect(() => {
  //   if (is_session_valid()) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  return (
    <div className="full-screen" style={{ overflow: "hidden" }}>
      <div className="form-box d-flex justify-content-center align-items-center">
        <div className="sign-in  d-none d-md-inline">
          <label className="input-label ">Don't have an account ? </label>

          <Link className="sign-link" to="/signup">
            Contact us
          </Link>
        </div>
        <div className="inner-from-box text-center">
          <h4 className="mb-4">Login</h4>
          <Box marginBottom="1rem">
            {servererror ? (
              <FormHelperText error>{servererror}</FormHelperText>
            ) : null}
          </Box>
          <form
            // method="POST"
            className="form d-flex flex-column text-start "
            onSubmit={handleSubmit}
          >
            <TextField
              name="email"
              type="text"
              // label="Email Address"
              placeholder="Email"
              style={{ marginBottom: "1rem" }}
              value={values.email}
              onChange={handleChange}
              error={(touched.email && errors.email) || null}
              helperText={errors.email}
              onBlur={handleBlur}
              id="outlined-error-helper-text"
            />
            {/* <FormControl sx={{ m: 0 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="email"
                type="text"
                // label="Email Address"
                placeholder="Email"
                // style={{ marginBottom: "1rem" }}
                value={values.email}
                onChange={handleChange}
                error={(touched.email && errors.email) || null}
                helperText={errors.email}
                onBlur={handleBlur}
                id="outlined-error-helper-text"
                style={{ backgroundColor: "rgb(240 240 240)" }}
                startAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="start"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl> */}

            <FormControl sx={{ m: 0 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
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
            {/* {touched.email && errors.email ? <div>{errors.email}</div> : null} */}
            <Button className="submit-button inputs" type="submit">
              Login
            </Button>
            <div className="text-center d-md-none">
              <h5>OR</h5>
              <Link className="sign-link text-center d-md-none" to="/dashboard">
                Contact us
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

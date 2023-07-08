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
  Divider,
} from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";

import { Logindata } from "../../global component/data_fetching_components/auth";
import validationSchema from "../../global component/schema for validation";
import { globalcontext } from "../../../routes/controler";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";

function Login() {
  const { seterrormessage, is_session_valid, setsuccessmessage } =
    useContext(globalcontext);
  const [loading, setloading] = useState(false);
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
      setloading(true);
      console.log(values.email, values.password);
      let data = await Logindata(values.email, values.password);
      console.log(data, "this is s");

      if (data.status === 1) {
        // for login
        Cookies.set("session_id", data.session_id);
        navigate("/dashboard");
      } else if (data.status === 0) {
        //if credentials are wrong
        setloading(false);
        setservererror(data.error);
      } else if (data.status === 2) {
        //for two factor authentication
        Cookies.set("session_id", data.session_id);
        setsuccessmessage("passcode has been sent to your email address");

        navigate("/2fa");
        setloading(false);
      } else if (data.servererror) {
        //for internat errors
        setloading(false);

        seterrormessage(data.servererror);
      }
    },
  });
  //  if the session id already exists then redirect to dashboard
  useEffect(() => {
    if (is_session_valid()) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Box
      className="full-screen"
      // sx={{
      //   overflow: "hidden",
      //   backgroundImage: "url('./Rectangle.svg')",
      //   backgroundRepeat: "no-repeat",
      // }}
      style={{
        overflow: "hidden",

        // backgroundImage: "url('./Rectangle.svg')",
        // backgroundRepeat: "no-repeat",
      }}
    >
      <div className="form-box d-flex justify-content-around align-items-center">
        {/* <div className="sign-in  d-none d-md-inline">
          <label className="input-label ">Don't have an account ? </label>

          <Link className="sign-link" to="/signup">
            Contact us
          </Link>
        </div> */}
        <div className="inner-from-box text-center ">
          {/* <img
            className="mb-4 me-4"
            src="./meta.png"
            // alt="METAMONIX Logo"
            style={{ width: "250px", height: "auto", filter: "invert(100%)" }}
          /> */}
          <h4>Login</h4>
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
              // label="Email Address"
              placeholder="Email"
              style={{ marginBottom: "1rem" }}
              value={values.email}
              onChange={handleChange}
              error={(touched.email && errors.email) || null}
              helperText={errors.email}
              onBlur={handleBlur}
              disabled={loading}
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
                disabled={loading}
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
            <Link className="mt-1 text-end fs-6 link ">Forgot password</Link>
            <Button
              className="submit-button inputs"
              type="submit"
              sx={{ borderRadius: "0px" }}
              disabled={loading}
            >
              {!loading ? (
                "Login"
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
                Don't have account ?{" "}
                <Link className="sign-link link fs-6" to="/dashboard">
                  Contact Us
                </Link>
              </Box>
            </div>
          </form>
        </div>
        <Box
          className="d-md-flex  d-none"
          // display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <img
            className=" me-4 "
            src="./meta.png"
            // alt="METAMONIX Logo"
            style={{ width: "150px", height: "auto" }}
          />
          <Box maxWidth="40vw" height="70vh">
            <img
              className="mb-4 me-4"
              src="./Frame.svg"
              // alt="METAMONIX Logo"
              style={{ width: "80%", height: "auto" }}
            />
            {/* <Carousel variant="light">
              <Carousel.Item>
                <img
                  className="d-block w-75 "
                  src="rocket.png"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-75"
                  src="server.svg.svg"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-75"
                  src="thinking.png"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel> */}
          </Box>
        </Box>
      </div>
    </Box>
  );
}

export default Login;

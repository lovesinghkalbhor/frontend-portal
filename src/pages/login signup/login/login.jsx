import "./login.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import { TextField, FormHelperText, Box } from "@mui/material";

import { Logindata } from "../../global component/data_fetching_components/auth";
import validationSchema from "../../global component/schema for validation/index";

function Login() {
  const navigate = useNavigate();
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
      let data = await Logindata(values.email, values.password);
      console.log(data, "this is s");

      if (data.status === 1) {
        Cookies.set("session_id", data.session_id);
        navigate("/");
      }
      if (data.status === 0) {
        // alert(data.error);
        setservererror(data.error);
      }
    },
  });

  return (
    <div className="full-screen">
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
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              error={(touched.email && errors.email) || null}
              helperText={errors.email}
              onBlur={handleBlur}
              id="outlined-error-helper-text"
              label="Email Address"
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              error={(touched.password && errors.password) || null}
              onBlur={handleBlur}
              id="outlined-error-helper-text"
              helperText={errors.password}
            ></TextField>

            <button className="submit-button inputs" type="submit">
              Login
            </button>
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

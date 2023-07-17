// import "./login.css";
import "../../global component/css/controler.css";

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  FormHelperText,
  Box,
  Button,
  InputAdornment,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import { TwoFactorAuth } from "../../global component/data_fetching_components/auth";
import validationSchema from "../../global component/schema for validation";
import { globalcontext } from "../../../routes/controler";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Two_Factor() {
  const { seterrormessage } = useContext(globalcontext);
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const [servererror, setservererror] = useState("");
  const initialValues = {
    passcode: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: async (parms) => {
        try {
          setloading(true);
          console.log(values.passcode);
          let data = await TwoFactorAuth(values.passcode);
          console.log(data, "this is s");

          if (data.status === 1) {
            navigate("/dashboard");
          } else if (data.status === 0) {
            setloading(false);
            setservererror(data.error);
          }
        } catch (err) {
          setloading(false);
          seterrormessage(err);
        }
      },
    });

  // useEffect(() => {
  //   if (is_session_valid()) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  return (
    <Box
      className="full-screen"
      style={{
        overflow: "hidden",
      }}
    >
      <div className="form-box d-flex justify-content-around align-items-center">
        <div className="inner-from-box text-center">
          <h3>Two Factor Authentication</h3>
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
              sx={{ color: "white", marginBottom: "10px" }}
            >
              Enter passcode
            </InputLabel>
            <FormControl sx={{ m: 0 }} variant="outlined">
              <OutlinedInput
                name="passcode"
                id="outlined-adornment-password"
                placeholder="passcode"
                disabled={loading}
                value={values.passcode}
                onChange={handleChange}
                error={(touched.passcode && errors.passcode) || null}
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
            <Button
              className="submit-button inputs"
              type="submit"
              sx={{ borderRadius: "0px" }}
              disabled={loading}
            >
              {!loading ? (
                "Submit"
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
          </form>
        </div>
        <Box
          className="d-md-flex  d-none"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <img
            className=" me-4 mt-3"
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

export default Two_Factor;

import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import { SearchUser } from "../global component/data_fetching_components/org";
import validationSchema from "../global component/schema for validation";
import { globalcontext } from "../../routes/controler";
import { primarycolor, radius } from "../../components/variable";
export default function SearchUserTab(props) {
  const {
    setservererror,
    servererror,
    is_session_valid,
    orgdata,
    seterrormessage,
    is_screen_sm,
  } = useContext(globalcontext);
  const [orguserdata, setorguserdata] = useState([]);
  const [loading, setloading] = useState(false);

  // formik here is
  const handleFocus = () => {
    setservererror(false);
  };
  const initialValues = {
    search_data: "",
    org_id: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        setloading(true);
        let data = {};
        let trimdata = values.search_data.trimEnd();
        try {
          await validationSchema.validate({ email: trimdata });
          console.log("Email is valid");

          data.email = trimdata;
        } catch (error) {
          console.log(error.message);
          data.first_name = trimdata;
          data.last_name = trimdata;
        }
        let a = await SearchUser(orgdata.org_id, data);
        if (a.status === 1) {
          console.log(a);
          setloading(false);
          setorguserdata(a.users);
          setservererror(false);
          console.log(orguserdata[0], "THIS IS TRUE ,,,,,,,,,,,,,,,");
        } else if (a.servererror) {
          seterrormessage(a.servererror);
        } else {
          setloading(false);
          setservererror(a.error);
        }
      },
    });

  useEffect(() => {
    console.log(orguserdata);
    props.searchedData(orguserdata);
  }, [orguserdata]);

  useEffect(() => {
    is_session_valid();
  }, []);

  return (
    <>
      <Box marginBottom={is_screen_sm ? "0.5rem" : "0.5rem"} width="100%">
        <Box marginBottom="1rem">{/* <h3></h3> */}</Box>
        {/* if server gives error then show */}
        {!!servererror ? <h6 className="text-danger">{servererror}</h6> : null}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={10} sm={6}>
              <OutlinedInput
                id="name-input"
                label="Search User"
                variant="outlined"
                name="search_data"
                placeholder="Email, First Name or Last Name"
                value={values.search_data}
                onChange={handleChange}
                required
                style={{ width: "100%" }}
                onBlur={handleBlur}
                onFocus={handleFocus}
                InputLabelProps={{
                  shrink: true,
                  color: "black",
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setValues({
                          ...values,
                          search_data: "",
                        });
                        setloading(false);
                        props.clearsearch();
                      }}
                      variant="contained"
                      type="submit"
                    >
                      <ClearIcon></ClearIcon>
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                variant="contained"
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: primarycolor,
                  marginTop: "0.5rem",
                  marginRight: "0.2rem",
                  borderRadius: radius,
                }}
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <SearchIcon></SearchIcon>
                )}
              </IconButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

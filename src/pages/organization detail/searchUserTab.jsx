import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";
import DataTable from "../../components/datatable";
import { SearchUser } from "../global component/data_fetching_components/org";
import validationSchema from "../global component/schema for validation";
import { globalcontext } from "../../routes/controler";
import { primarycolor, radius } from "../../components/variable";
export default function SearchUserTab(props) {
  const { is_session_valid, orgdata, seterrormessage, is_screen_sm } =
    useContext(globalcontext);
  const [column, setcolumn] = useState([]);
  const [orguserdata, setorguserdata] = useState([]);

  let columns = [
    { field: "id", headerName: "ID", width: 130 },
    {
      field: "full_name",
      headerName: "User Name",
      width: 200,
      valueGetter: (params) =>
        `${params.row.first_name} ${params.row.last_name}`,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "user_type",
      headerName: "User Type",
      width: 160,
    },
  ];

  // formik here is

  const initialValues = {
    search_data: "",

    org_id: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        // setcolumn(columns);
        let data = {};
        try {
          await validationSchema.validate({ email: values.search_data });
          console.log("Email is valid");
          data.email = values.search_data;
        } catch (error) {
          console.log(error.message);
          data.first_name = values.search_data;
          data.last_name = values.search_data;
        }
        let a = await SearchUser(orgdata.org_id, data);
        if (a.status === 1) {
          console.log(a);
          setorguserdata(a.users);
          console.log(orguserdata[0], "THIS IS TRUE ,,,,,,,,,,,,,,,");
        } else if (a.servererror) {
          seterrormessage(a.servererror);
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
                        props.clearsearch();
                      }}
                      variant="contained"
                      type="submit"
                      // style={{
                      //   // padding: "0.5rem",
                      //   // paddingLeft: "1rem",
                      //   // paddingRight: "1rem",
                      //   color: "white",
                      //   backgroundColor: primarycolor,
                      //   marginTop: "0.5rem",
                      //   borderRadius: radius,
                      // }}
                    >
                      <ClearIcon></ClearIcon>
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            </Grid>
            <Grid item xs={2}>
              {/* {ismodify ? ( */}
              <IconButton
                variant="contained"
                type="submit"
                style={{
                  // padding: "0.5rem",
                  // paddingLeft: "1rem",
                  // paddingRight: "1rem",
                  color: "white",
                  backgroundColor: primarycolor,
                  marginTop: "0.5rem",
                  marginRight: "0.2rem",
                  borderRadius: radius,
                }}
              >
                <SearchIcon></SearchIcon>
              </IconButton>
              {/* ) : null} */}
              {/* </Grid>
            <Grid item xs={12} md={2}> */}
              {/* {ismodify ? ( */}
              {/* <IconButton
                onClick={() => {
                  props.clearsearch();
                }}
                variant="contained"
                type="submit"
                style={{
                  // padding: "0.5rem",
                  // paddingLeft: "1rem",
                  // paddingRight: "1rem",
                  color: "white",
                  backgroundColor: primarycolor,
                  marginTop: "0.5rem",
                  borderRadius: radius,
                }}
              >
                <ClearIcon></ClearIcon>
              </IconButton> */}
              {/* ) : null} */}
            </Grid>
          </Grid>
        </form>
        {/* {orguserdata[0] ? (
          <DataTable datarow={orguserdata} datacolumn={columns}></DataTable>
        ) : //   <Box>No user found</Box>
        null} */}
      </Box>
    </>
  );
}

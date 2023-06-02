import React, { useEffect, useState, useContext } from "react";
import {
  primarycolor,
  iconbackgroundcolor,
  shadow,
  radius,
  borderTop,
} from "../../components/variable";
import {
  OrgUserData,
  RevokeUser,
  SuspendUser,
} from "../global component/data_fetching_components/org";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
// import { orgcontext } from "./organization page";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  List,
  TextField,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Divider,
} from "@mui/material";
import { globalcontext } from "../../routes/controler";
import SearchUserTab from "./searchUserTab";

function Row(props) {
  const [open, setOpen] = useState(false);
  // const { orgdata } = useContext(orgcontext);
  const {
    is_screen_sm,
    servererror,
    setservererror,
    is_session_valid,
    successmessage,
    setsuccessmessage,
    orgdata,
  } = useContext(globalcontext);
  console.log(
    orgdata,
    "thisis the data fo the ofgr adfds11111111111111222222222222999999999999"
  );

  const [isdisable, setisdisable] = useState(false);
  console.log(orgdata.org_id, "this is ht eROW OF THE ");
  const initialValues = {
    user_id: "",
    // org_id: "",
    suspend: false,
    revoke: false,
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values) => {
        // log all form values
        if (values.suspend) {
          console.log("in the   SUSPEND state");
          SuspendUser(orgdata.org_id, values.user_id)
            .then((data) => {
              if (data.status === 1) {
                setservererror(false);
                setsuccessmessage("User has been successfully suspended");
              } else {
                setservererror(data.error);
              }
              console.log(
                data,
                "this si for suspend 1111111111111111111111111111000000000000000"
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (values.revoke) {
          console.log("in the   SUSPEND state");

          RevokeUser(orgdata.org_id, values.user_id)
            .then((data) => {
              if (data.status === 1) {
                setservererror(false);

                setsuccessmessage("User has been successfully revoked");
              } else {
                setservererror(data.error);
                // alert(error);
              }
              console.log(
                data,
                "this si for suspend 1111111111111111111111111111000000000000000"
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    });

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          <Link
            style={{ cursor: "pointer", textDecoration: "none" }}
            to={`/org/update?email=${props?.row.email}&first_name=${props?.row.first_name}&last_name=${props?.row.last_name}`}
          >
            {props?.row.first_name} {props?.row.last_name}
          </Link>
        </TableCell>
        {/* <TableCell>{props?.row.last_name}</TableCell> */}
        <TableCell>{props?.row.email}</TableCell>
        <TableCell>{props?.row.user_type}</TableCell>
      </TableRow>
      <TableRow>
        {/* just empty box so we can give the extra space on left */}
        <TableCell></TableCell>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={12}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box id="from" marginTop="0.8rem">
              <form>
                <Grid container spacing={2}>
                  {/*  <Grid item xs={12} sm={6} lg={3}>
                    <TextField
                      id="Current-input"
                      label=" ORG ID"
                      variant="outlined"
                      name="org_id"
                      placeholder="Enter ORG ID"
                      value={values.org_id}
                      onChange={handleChange}
                      error={!!servererror}
                      helperText={servererror}
                      // onFocus={() => {
                      //   setValues({
                      //     ...values,
                      //     suspend: true,
                      //     revoke: false,
                      //     revoke_user: "",
                      //   });
                      // }}
                      // disabled={!isdisable}

                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      style={{ width: "100%", marginBottom: "1rem" }}
                    />
                  </Grid> */}

                  <Grid item xs={12} sm={6} lg={6}>
                    <TextField
                      id="new-input"
                      label="EMAIL ID"
                      variant="outlined"
                      name="user_id"
                      placeholder="Enter EMAIL ID"
                      value={values.user_id}
                      onChange={handleChange}
                      error={!!servererror}
                      helperText={servererror}
                      // onFocus={() => {
                      //   setValues({
                      //     ...values,
                      //     suspend: false,
                      //     revoke: true,
                      //     suspend_user: "",
                      //   });
                      // }}
                      onBlur={() => {
                        setservererror(false);
                      }}
                      // disabled={!isdisable}
                      // onFocus={() => {
                      //   setisdisable(true);
                      // }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      style={{ width: "100%", marginBottom: "1rem" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} lg={2}>
                    <Button
                      id="suspend"
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                      onFocus={() => {
                        setValues({
                          ...values,
                          suspend: true,
                          revoke: false,
                        });
                      }}
                      style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        color: "white",
                        backgroundColor: primarycolor,
                        marginTop: "1rem",
                        borderRadius: radius,
                        marginBottom: "1rem",
                      }}
                    >
                      Suspend
                    </Button>{" "}
                  </Grid>
                  <Grid item xs={12} sm={3} lg={2}>
                    <Button
                      type="submit"
                      id="revoke"
                      variant="contained"
                      onClick={handleSubmit}
                      onFocus={() => {
                        setValues({
                          ...values,
                          revoke: true,
                          suspend: false,
                        });
                      }}
                      style={{
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        color: "white",
                        backgroundColor: primarycolor,
                        marginTop: "1rem",
                        borderRadius: radius,
                        marginBottom: "1rem",
                      }}
                    >
                      Revoke
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Users() {
  let columns = [
    {
      field: "first_name",
      headerName: "Name",
      width: 130,
    },
    // { field: "last_name", headerName: "Last Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "user_type",
      headerName: "User Type",
      width: 160,
    },
  ];
  const {
    is_screen_sm,

    is_session_valid,
    orgdata,
  } = useContext(globalcontext);

  const [orguserdata, setorguserdata] = useState([]);
  // const [clearsearch, setclearsearch] = useState(false);
  const [column, setcolumn] = useState([]);
  const [rowsWithstate, setrowsWithstate] = useState([]);

  // const { orgdata } = useContext(orgcontext);

  async function getorguserdata() {
    let data = await OrgUserData(orgdata?.org_id);
    if (data.status === 1) {
      setorguserdata(data.users);
    }
  }
  // useEffect(() => {
  //   console.log(orguserdata);
  // }, [orguserdata]);

  useEffect(() => {
    getorguserdata();
    is_session_valid();
  }, [orgdata]);

  function search(data) {
    setorguserdata(data);
  }
  function clearSearch() {
    // setorguserdata();
    getorguserdata();
  }
  return (
    <>
      <SearchUserTab
        searchedData={search}
        clearsearch={clearSearch}
      ></SearchUserTab>
      <Divider style={{ color: "black", opacity: 1 }}></Divider>
      <TableContainer
        component={Paper}
        style={{
          height: "100vh",
          borderRadius: radius,
          // border={`1px solid ${primarycolor}`}
        }}
      >
        <Table aria-label="collapsible dense table ">
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((column) => {
                return <TableCell>{column.headerName}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {orguserdata !== []
              ? orguserdata?.map((row, index) => (
                  <Row key={row.email} row={row} />
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

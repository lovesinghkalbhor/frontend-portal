import React, { useEffect, useState, useContext } from "react";
import { primarycolor, radius } from "../../components/variable";
import Spinner from "react-bootstrap/Spinner";

import {
  OrgUserData,
  RevokeUser,
  SuspendUser,
} from "../global component/data_fetching_components/org";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
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
import { Box, Button, TextField, Grid, Divider } from "@mui/material";
import { globalcontext } from "../../routes/controler";
import SearchUserTab from "./searchUserTab";

function Row(props) {
  const [open, setOpen] = useState(false);
  const { servererror, setservererror, setsuccessmessage, orgdata } =
    useContext(globalcontext);
  console.log(
    orgdata,
    "thisis the data fo the ofgr adfds11111111111111222222222222999999999999"
  );

  console.log(orgdata.org_id, "this is ht eROW OF THE ");
  const initialValues = {
    user_id: "",

    suspend: false,
    revoke: false,
  };
  const { values, handleChange, handleSubmit, setValues } = useFormik({
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
                      onBlur={() => {
                        setservererror(false);
                      }}
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
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "user_type",
      headerName: "User Type",
      width: 160,
    },
  ];
  const { is_session_valid, orgdata } = useContext(globalcontext);
  const [orguserdata, setorguserdata] = useState([]);

  async function getorguserdata() {
    let data = await OrgUserData(orgdata?.org_id);
    if (data.status === 1) {
      setorguserdata(data.users);
    }
  }

  useEffect(() => {
    getorguserdata();
    is_session_valid();
  }, [orgdata]);

  function search(data) {
    setorguserdata(data);
  }
  function clearSearch() {
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

          <TableBody style={{ position: "relative" }}>
            {orguserdata.length !== 0 ? (
              orguserdata?.map((row, index) => (
                <Row key={row.email} row={row} />
              ))
            ) : (
              <>
                <Box
                  textAlign="center"
                  position="absolute"
                  top="30%"
                  left="50%"
                >
                  <Spinner
                    as="span"
                    style={{
                      color: primarycolor,
                    }}
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true"
                  />
                </Box>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

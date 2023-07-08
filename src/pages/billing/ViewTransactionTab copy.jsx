import { React, useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Spinner from "react-bootstrap/Spinner";

import {
  shadow,
  primarycolor,
  radius,
  borderTop,
} from "../../components/variable";
// import { primarycolor } from "../../components/variable";
import { useFormik } from "formik";
import { viewTransaction } from "../global component/data_fetching_components/billing_endpoints";
import { globalcontext } from "../../routes/controler";

export default function ViewTransaction() {
  const [transactiondata, settransactiondata] = useState({});
  const { setservererror, is_session_valid, is_screen_sm } =
    useContext(globalcontext);

  useEffect(() => {
    console.log("in ht view transactiondatabase tab of h");
    const searchParams = new URLSearchParams(window.location.search);
    let ref_number = searchParams.get("reference_number");

    let data = async (values) => {
      let a = await viewTransaction(ref_number);
      if (a.status === 1) {
        console.log(a.billing);
        settransactiondata(a.billing);
      } else if (a.status === 0) {
        setservererror(a.error);
      }
    };
    data();
    console.log(ref_number);

    is_session_valid();
  }, []);

  // formik here is
  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
    reference_number: "",
    password: "",
    gateway: "",
    gateway_ref: "",
    amount: "",
    currency: "",
    currency_symbol: "",
    applicable_tax: "",
    tax: "",
    net_amount: "",
    datetime: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        //   let a = await viewTransaction(ref_number.number);
        //   if (a.status === 1) {
        //     console.log(a.billing);
        //     settransactiondata(a.billing);
        //   } else if (a.status === 0) {
        //     setservererror(a.error);
        //   }
      },
    });
  let taxstring = transactiondata.tax || ""; // Assuming transactiondata.tax is a string
  let arr = [];
  if (taxstring) {
    arr = taxstring.split(",").map((element) => element.slice(1, -1)); // Remove brackets using slice()
  }

  return (
    <Box
      // margin="2rem"
      width={is_screen_sm ? "95%" : "100%"}
      padding={is_screen_sm ? "2rem" : "0.2rem"}
      margin={is_screen_sm ? "0.5rem" : "0rem"}
      backgroundColor="#FFFFFF"
      boxShadow={shadow}
      borderRadius={radius}
      // border={`1px solid ${primarycolor}`}
      borderTop={borderTop}
    >
      <Box display="flex" justifyContent="space-between" marginBottom="1rem">
        <h3>Transaction Details</h3>
        {!transactiondata.reference_number ? (
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
        ) : null}
      </Box>
      <form onSubmit={handleSubmit}>
        {/* <Grid item xs={6} md={4}>
          <TextField
            id="name-input"
            label="Reference Number"
            variant="outlined"
            name="reference_number"
            placeholder="Enter Reference Number"
            value={values.reference_number}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "1rem" }}
            onBlur={handleBlur}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {transactiondata.reference_number ? ( */}
        <Box>
          {/* <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <TextField
                id="name-input"
                label="Reference Number"
                variant="outlined"
                value={transactiondata.reference_number}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
                disabled
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="address1-input"
                label="Password"
                variant="outlined"
                name="password"
                value={transactiondata.password || "unknown"}
                onChange={handleChange}
                disabled
                style={{ width: "100%", marginBottom: "1rem" }}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="address2-input"
                label="Gateway"
                variant="outlined"
                name="gateway"
                value={transactiondata.gateway || "unknown"}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
                disabled
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="city-input"
                label="Gateway Ref"
                variant="outlined"
                name="gateway_ref"
                value={transactiondata.gateway_ref || "unknown"}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
                disabled
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="state-input"
                label="Amount"
                variant="outlined"
                name="amount"
                value={transactiondata.amount || "unknown"}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
                disabled
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="country-input"
                label="Currency"
                variant="outlined"
                name="currency"
                value={transactiondata.currency || "unknown"}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: "1rem" }}
                disabled
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="phone-input"
                label="Currency Symbol"
                variant="outlined"
                name="currency_symbol"
                disabled
                value={transactiondata.currency_symbol || "unknown"}
                style={{ width: "100%", marginBottom: "1rem" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="taxid-input"
                label="Applicable Tax"
                variant="outlined"
                name="applicable_tax"
                disabled
                value={transactiondata.applicable_tax || "unknown"}
                style={{ width: "100%", marginBottom: "1rem" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="pincode-input"
                label="Tax"
                variant="outlined"
                name="tax"
                disabled
                value={transactiondata.tax || "unknown"}
                style={{
                  width: "100%",
                  marginBottom: "1rem",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="currency-input"
                label="Net Amount"
                variant="outlined"
                name="net_amount"
                disabled
                value={transactiondata.net_amount || "unknown"}
                style={{ width: "100%", marginBottom: "1rem" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                id="org-input"
                label="Date Time"
                variant="outlined"
                name="datetime"
                value={transactiondata.datetime || "unknown"}
                disabled
                style={{ width: "100%", marginBottom: "1rem" }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid> */}

          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Reference Number
                  </TableCell>
                  <TableCell>
                    {transactiondata.reference_number || "unknown"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Gateway
                  </TableCell>
                  <TableCell>{transactiondata.gateway || "unknown"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Gateway Ref
                  </TableCell>
                  <TableCell>
                    {transactiondata.gateway_ref || "unknown"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Amount
                  </TableCell>
                  <TableCell>
                    {transactiondata.currency_symbol}
                    {transactiondata.amount}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Tax
                  </TableCell>
                  <TableCell>{arr[0] || "unknown"}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    Net Amount
                  </TableCell>
                  <TableCell>
                    {transactiondata.currency_symbol}
                    {transactiondata.net_amount || "unknown"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* ) : null} */}

        <Box display="flex" justifyContent="start">
          {/* {ismodify ? ( */}
          {/* <Button
            variant="contained"
            type="submit"
            style={{
              padding: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              color: "white",
              backgroundColor: primarycolor,
              marginBottom: "1rem",
              borderRadius: "0.5rem",
            }}
          >
            Save
          </Button> */}
          {/* ) : null} */}
        </Box>
      </form>
    </Box>
  );
}

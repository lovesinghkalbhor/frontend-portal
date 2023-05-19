import { React, useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Grid, Switch } from "@mui/material";
import { primarycolor } from "../../components/variable";
import { useFormik } from "formik";
import { UpdateOrgData } from "../global component/data_fetching_components/org";
import { viewTransaction } from "../global component/data_fetching_components/billing_endpoints";

export default function ViewTransaction() {
  const [ismodify, setismodify] = useState(false);
  const [transactiondata, settransactiondata] = useState({});

  // formik here is

  const initialValues = {
    // firstname: userinfo.firstName, // Set default value to empty string if userinfo.firstName is undefined
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
        // console.log(orgdata, "hereis the org data that apperarsfsdf");
        let a = await viewTransaction(values.reference_number);
        if (a.status === 1) {
          console.log(a.billing);
          settransactiondata(a.billing);
          console.log(
            transactiondata.reference_number,
            "THIS IS TRUE ,,,,,,,,,,,,,,,"
          );
        } else {
          console.log("55555555555555555555555550000000000000000000");
        }
      },
    });

  useEffect(() => {
    async function b() {
      let a = await viewTransaction(values.reference_number);
      if (a.status === 1) {
        console.log(a.billing);
        settransactiondata(a.billing);
        console.log(
          transactiondata.reference_number,
          "THIS IS TRUE ,,,,,,,,,,,,,,,"
        );
      } else {
        console.log("55555555555555555555555550000000000000000000");
      }
    }
    b();
  }, []);
  useEffect(() => {
    console.log(
      transactiondata,
      "called agian and aginasdjalkdjfklejrioq3tou34tj"
    );
  }, [transactiondata]);

  return (
    <Box margin="2rem">
      <Box display="flex" justifyContent="space-between" marginBottom="1rem">
        <h3>View Transaction</h3>
        {/* <Box>
          <h5>Modify</h5>
          <Switch
            color="secondary"
            onChange={() => setismodify(!ismodify)}
          ></Switch>
        </Box> */}
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid item xs={6} md={4}>
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
        {transactiondata.reference_number ? (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <TextField
                  id="name-input"
                  label="Reference Number"
                  variant="outlined"
                  //   name="reference_number"

                  value={transactiondata.reference_number}
                  onChange={handleChange}
                  //   disabled
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
            </Grid>
          </Box>
        ) : null}

        <Box display="flex" justifyContent="start">
          {/* {ismodify ? ( */}
          <Button
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
          </Button>
          {/* ) : null} */}
        </Box>
      </form>
    </Box>
  );
}

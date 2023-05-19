import { React, useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import { Box, Button, TextField, Grid, Switch } from "@mui/material";
import { primarycolor, shadow } from "../../components/variable";
import { globalcontext } from "../../routes/controler";
import { AddFund } from "../global component/data_fetching_components/billing_endpoints";
import { useFormik } from "formik";
import { viewInvoice } from "../global component/data_fetching_components/billing_endpoints";
import { Link } from "react-router-dom";

function AddFunds() {
  const { is_screen_sm, is_session_valid, servererror, setservererror } =
    useContext(globalcontext);
  useEffect(() => {
    is_session_valid();
  });
  const [addfunddata, setaddfunddata] = useState({});
  const [transfertype, settransfertype] = useState({
    net_banking: "3",

    credit_card: "1",

    debit_card: "2",
  });
  const [platformfee, setplatformfee] = useState(false);
  const [showpaymentbtn, setshowpaymentbtn] = useState(false);
  const [showdetails, setshowdetails] = useState(false);

  // formik here is

  const initialValues = {
    // firstname: userinfo.firstName, // Set default value to empty string if userinfo.firstName is undefined
    amount: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      initialValues: initialValues,
      onSubmit: async (values) => {
        // console.log(orgdata, "hereis the org data that apperarsfsdf");
        let total = totalAmount(18, values.amount, platformfee);
        if (total > 0) {
          let a = await AddFund(total);
          if (a.status === 1) {
            console.log(a.billing);
            setaddfunddata(a.billing);
          } else {
            console.log("55555555555555555555555550000000000000000000");
          }
        } else {
          setservererror("amount should be more than 0");
        }
      },
    });

  // useEffect(() => {
  //   async function b() {
  //     let a = await AddFund(values.amount);
  //     if (a.status === 1) {
  //       console.log(a.billing);
  //       setaddfunddata(a.billing);
  //       console.log(addfunddata.order_number, "THIS IS TRUE ,,,,,,,,,,,,,,,");
  //     } else {
  //       console.log("55555555555555555555555550000000000000000000");
  //     }
  //   }
  //   b();
  // }, []);
  // useEffect(() => {
  //   console.log(addfunddata, "called agian and aginasdjalkdjfklejrioq3tou34tj");
  // }, [addfunddata]);

  function calculat_percentage(percentage, amount) {
    let fee = (amount * percentage) / 100;

    return fee;
  }
  function totalAmount(GST, amount, platformfee) {
    let total =
      calculat_percentage(GST, amount) +
      calculat_percentage(platformfee, amount) +
      amount;

    return total;
  }

  return (
    <>
      <Box
        width={is_screen_sm ? "95%" : "100%"}
        padding={is_screen_sm ? "2rem" : "1rem"}
        margin={is_screen_sm ? "1rem" : "0rem"}
        marginTop={is_screen_sm ? "0rem" : "4rem"}
        borderRadius="1.2rem"
        backgroundColor="#FFFFFF"
        boxShadow={shadow}
      >
        <Grid container spacing={4}>
          <Grid item md={6} lg={4}>
            <Card
              style={{
                width: "100%",
                padding: "0.5rem",
                backgroundColor: "#FFFFFF",
                boxShadow: shadow,
                cursor: "pointer",
              }}
              onClick={() => {
                // settransfertype({
                //   ...transfertype,
                //   credit_card: {
                //     isselect: true,
                //   },
                //   debit_card: { isselect: false },
                //   net_banking: { isselect: false },
                // });
                setplatformfee(transfertype.credit_card);
              }}
              bg="Light"
            >
              <Card.Body>
                <Card.Title>Credit card</Card.Title>

                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Subtitle>
                  Charge {transfertype.credit_card}%
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Grid>
          <Grid item md={6} lg={4}>
            <Card
              style={{
                width: "100%",
                padding: "0.5rem",
                backgroundColor: "#FFFFFF",
                boxShadow: shadow,
                cursor: "pointer",
              }}
              onClick={() => {
                setplatformfee(transfertype.net_banking);
              }}
              bg="Light"
            >
              <Card.Body>
                <Card.Title>Net Banking </Card.Title>

                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Subtitle>
                  Charge {transfertype.net_banking}%
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Grid>
          <Grid item md={6} lg={4}>
            <Card
              style={{
                width: "100%",
                padding: "0.5rem",
                backgroundColor: "#FFFFFF",
                boxShadow: shadow,
                cursor: "pointer",
              }}
              onClick={() => {
                setplatformfee(transfertype.debit_card);
              }}
              bg="Light"
            >
              <Card.Body>
                <Card.Title>Debit Card</Card.Title>

                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Card.Subtitle>Charge {transfertype.debit_card}%</Card.Subtitle>
              </Card.Body>
            </Card>
          </Grid>
        </Grid>

        {platformfee ? (
          <Box margin="2rem">
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom="1rem"
            >
              <h3>Add Fund</h3>
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid item xs={6} md={4}>
                <TextField
                  id="name-input"
                  label="Amount"
                  type="number"
                  variant="outlined"
                  name="amount"
                  placeholder="Enter Amount"
                  value={values.amount}
                  onChange={handleChange}
                  error={!!servererror}
                  helperText={servererror}
                  required
                  style={{ width: "100%", marginBottom: "1rem" }}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {showpaymentbtn ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="start"
                >
                  <Box
                    backgroundColor="gray"
                    marginTop="1rem"
                    marginBottom="1rem"
                    style={{
                      width: "100%",
                      padding: "1rem",
                      backgroundColor: "#FFFFFF",
                      boxShadow: shadow,
                      cursor: "pointer",
                    }}
                  >
                    <Box>
                      platformfee : {values.amount}+{platformfee}% =
                      {calculat_percentage(platformfee, values.amount) +
                        values.amount}
                    </Box>
                    <br></br>
                    <Box>
                      GST : {values.amount}+{18}% =
                      {calculat_percentage(18, values.amount) + values.amount}
                    </Box>
                    <br></br>
                    <Box>
                      Payable amount :
                      {totalAmount(18, values.amount, platformfee)}
                    </Box>
                  </Box>
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
                    Pay
                  </Button>
                </Box>
              ) : (
                <Box display="flex" justifyContent="start">
                  <Button
                    variant="contained"
                    // type="submit"
                    onClick={() => {
                      setshowpaymentbtn(true);
                    }}
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
                    Proceed
                  </Button>
                </Box>
              )}
            </form>

            {/* <Box margin="1rem">GST : 18%</Box>
            <Box margin="1rem">plateform fee : {platformfee}</Box> */}
            {addfunddata.order_number && values.amount ? (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <TextField
                      id="name-input"
                      label="Order Number"
                      variant="outlined"
                      //   name="reference_number"

                      value={addfunddata.order_number}
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
                      value={addfunddata.password || "unknown"}
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
                      id="state-input"
                      label="Amount"
                      variant="outlined"
                      name="amount"
                      value={addfunddata.amount || "unknown"}
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
                      value={addfunddata.currency || "unknown"}
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
                      value={addfunddata.currency_symbol || "unknown"}
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
                      value={addfunddata.applicable_tax || "unknown"}
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
                      value={addfunddata.tax || "unknown"}
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
                      value={addfunddata.net_amount || "unknown"}
                      style={{ width: "100%", marginBottom: "1rem" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <Link to={addfunddata.payment_link} target="_blank">
                      Click this link for payment
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            ) : null}
            {/* <Box display="flex" justifyContent="start">
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
                  Proceed
                </Button>
              </Box> */}
          </Box>
        ) : (
          <Box display="flex" justifyContent="space-between" marginTop="2rem">
            <h3>Select the payment method</h3>
          </Box>
        )}
      </Box>
    </>
  );
}

export default AddFunds;

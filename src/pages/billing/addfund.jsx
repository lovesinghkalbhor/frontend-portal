import { React, useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import {
  Box,
  Button,
  TextField,
  Grid,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  primarycolor,
  shadow,
  radius,
  borderTop,
} from "../../components/variable";
import { globalcontext } from "../../routes/controler";
import { AddFund } from "../global component/data_fetching_components/billing_endpoints";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { calculat_percentage, totalAmount } from "./helperfunction";
import { add } from "lodash";

/**  this page adds the payment*/
function AddFunds() {
  // this destructure the variable and funtion form the globalcontext
  const { is_screen_sm, is_session_valid, servererror, setservererror } =
    useContext(globalcontext);

  const [platformfee, setplatformfee] = useState(false);
  const [showpaymentbtn, setshowpaymentbtn] = useState(false);
  const [isclicked, setisclicked] = useState(false);
  const [addfunddata, setaddfunddata] = useState({});
  const [transfertype, settransfertype] = useState({
    net_banking: "3",
    credit_card: "1",
    debit_card: "2",
  });

  // this is_session_valid is the function form the globalcontext object that check for the valid session Id for every render with useEffect
  useEffect(() => {
    is_session_valid();
  }, []);

  // formik start form here is
  const initialValues = {
    amount: "",
  };
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      let total = totalAmount(18, values.amount, platformfee);
      //only adding the amount if its more than 0
      if (total > 0) {
        let a = await AddFund(total);
        // if api status true then set the response in state else give error
        if (a.status === 1) {
          console.log(
            a.billing,
            "rrrrrrrrrrrrrrrrrgggggggggggggggggtttttttttttth"
          );
          setaddfunddata(a.billing);
        } else if (a.status === 0) {
          setservererror(a.error);
        }
      } else {
        setservererror("amount should be more than 0");
      }
    },
  });
  // if (addfunddata.order_number) {
  //   console.log("chlidked asefkj");
  //   alert(addfunddata.order_number);
  // }

  return (
    <>
      <Box
        width={is_screen_sm ? "95%" : "100%"}
        padding={is_screen_sm ? "2rem" : "1rem"}
        margin={is_screen_sm ? "1rem" : "0rem"}
        marginTop={is_screen_sm ? "0rem" : "4rem"}
        backgroundColor="#FFFFFF"
        boxShadow={shadow}
        borderRadius={radius}
        // border={`1px solid ${primarycolor}`}
        borderTop={borderTop}
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
                borderTop: borderTop,
              }}
              onClick={() => {
                setplatformfee(transfertype.credit_card);
                window.scrollTo(0, document.body.scrollHeight);
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
                borderTop: borderTop,
              }}
              onClick={() => {
                setplatformfee(transfertype.net_banking);
                window.scrollTo(0, document.body.scrollHeight);
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
                borderTop: borderTop,
              }}
              onClick={() => {
                setplatformfee(transfertype.debit_card);
                window.scrollTo(0, document.body.scrollHeight);
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
        {/* if payment mode selected then only show addfund input else show message "Select the payment method" ///////////////////////////////////////////////////////////////////} */}
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
                  disabled={isclicked}
                  required
                  style={{ width: "100%", marginBottom: "1rem" }}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {/* show pay button only when click to proceed ///////////////////////////////////////////////////////////////////////////// */}
              {showpaymentbtn && values.amount ? (
                <>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="start"
                  >
                    <Box
                      backgroundColor="gray"
                      marginTop="1rem"
                      marginBottom="1rem"
                      borderRadius={radius}
                      // border={`1px solid ${primarycolor}`}
                      borderTop={borderTop}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        backgroundColor: "#FFFFFF",
                        boxShadow: shadow,
                        cursor: "pointer",
                      }}
                    >
                      {/* <Box>
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
                    */}

                      <TableContainer>
                        <Table sx={{ minWidth: 200 }} aria-label="simple table">
                          <TableBody>
                            {addfunddata.order_number ? (
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  Order Number :
                                </TableCell>
                                <TableCell>
                                  {addfunddata.order_number}
                                </TableCell>
                              </TableRow>
                            ) : null}
                            <TableRow>
                              <TableCell component="th" scope="row">
                                platformfee :
                              </TableCell>
                              <TableCell>
                                {values.amount} + {platformfee}% =
                                {calculat_percentage(
                                  platformfee,
                                  values.amount
                                ) + values.amount}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                GST :
                              </TableCell>
                              <TableCell>
                                {values.amount} + {18}% =
                                {calculat_percentage(18, values.amount) +
                                  values.amount}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                Payable amount :
                              </TableCell>
                              <TableCell>
                                {totalAmount(18, values.amount, platformfee)}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </>
              ) : null}

              {showpaymentbtn ? (
                <Button
                  type="submit"
                  variant="contained"
                  // onSubmit={handleSubmit}
                  onClick={() => {
                    if (addfunddata.payment_link) {
                      window.open(addfunddata.payment_link, "_blank");
                    }
                  }}
                  style={{
                    padding: "0.5rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    color: "white",
                    width: "100%",
                    backgroundColor: primarycolor,
                    marginBottom: "1rem",
                    borderRadius: radius,
                  }}
                >
                  {addfunddata.order_number ? "pay" : "wait..."}
                </Button>
              ) : (
                // <Box display="flex" justifyContent="start">
                <Button
                  type="submit"
                  onClick={() => {
                    setshowpaymentbtn(true);
                    setisclicked(true);
                    setTimeout(() => {
                      window.scrollTo(0, document.body.scrollHeight);
                    }, 500);
                  }}
                  variant="contained"
                  // onSubmit={handleSubmit}

                  style={{
                    padding: "0.5rem",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    color: "white",
                    backgroundColor: primarycolor,
                    marginBottom: "1rem",
                    borderRadius: radius,
                  }}
                >
                  Proceed
                </Button>
                // </Box>
              )}
            </form>
            {/* if got the data from the server then only show the response got from the server and also amout should entered */}
            {addfunddata.order_number && values.amount ? (
              <Box>
                <Grid container spacing={2}>
                  {/* <Grid item xs={6} md={4}>
                    <TextField
                      id="name-input"
                      label="Order Number"
                      variant="outlined"
                      value={addfunddata.order_number}
                      onChange={handleChange}
                      style={{ width: "100%", marginBottom: "1rem" }}
                      disabled
                      onBlur={handleBlur}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid> */}
                  {/* <Grid item xs={6} md={4}>
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
                  </Grid> */}
                  {/* <Grid item xs={6} md={4}>
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
                  </Grid> */}
                  {/* <Grid item xs={6} md={4}>
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
                  </Grid> */}
                  {/* <Grid item xs={6} md={4}>
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
                  </Grid> */}
                  {/* <Grid item xs={6} md={4}>
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
                  </Grid> */}
                  {/* <Grid item xs={6} md={4}>
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
                  </Grid> */}

                  {/* <Grid item xs={6} md={4}>
                    <Link to={addfunddata.payment_link} target="_blank">
                      Click this link for payment
                    </Link>
                  </Grid> */}
                </Grid>
              </Box>
            ) : null}
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

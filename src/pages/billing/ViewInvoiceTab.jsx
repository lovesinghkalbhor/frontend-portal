import { React, useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import {
  primarycolor,
  shadow,
  radius,
  borderTop,
} from "../../components/variable";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { calculat_percentage, totalAmount } from "./helperfunction";
import { useFormik } from "formik";
import { viewInvoice } from "../global component/data_fetching_components/billing_endpoints";
import { globalcontext } from "../../routes/controler";
import { OrgEndpoint } from "../global component/data_fetching_components/org";

export default function ViewInvoice() {
  const [transactiondata, settransactiondata] = useState({});
  const {
    setservererror,
    is_session_valid,
    is_screen_sm,
    orgdata,
    setorgdata,
    seterrormessage,
  } = useContext(globalcontext);

  useEffect(() => {
    console.log("in ht view transactiondatabase tab of h");
    const searchParams = new URLSearchParams(window.location.search);
    let invoice_number = searchParams.get("invoice_number");

    let data = async (values) => {
      let a = await viewInvoice(invoice_number);
      if (a.status === 1) {
        console.log(a.invoice);
        settransactiondata(a.invoice);
      } else {
        console.log("55555555555555555555555550000000000000000000");
      }
    };
    data();
    is_session_valid();
  }, []);

  async function getorgdata() {
    let a = await OrgEndpoint();
    if (a.status === 1) {
      setorgdata(a.organization);
      console.log(orgdata);
    } else if (a.servererror) {
      seterrormessage(a.servererror);
    }
  }
  useEffect(() => {
    if (!orgdata.fetched) {
      console.log("not avialable org data ");
      getorgdata();
    }
  }, []);

  // formik here is
  const initialValues = {
    // Set default value to empty string if userinfo.firstName is undefined
    invoice_number: "",
    date: "",
    status: "",
    password: "",
    amount: "",
    currency: "",
    currency_symbol: "",
    applicable_tax: "",
    tax: "",
    net_amount: "",
    transaction_id: "",
    url: "",
  };
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      //   let a = await viewInvoice(values.invoice_number);
      //   if (a.status === 1) {
      //     console.log(a.invoice);
      //     settransactiondata(a.invoice);
      //   } else {
      //     console.log("55555555555555555555555550000000000000000000");
      //   }
    },
  });

  return (
    <>
      {/* Hello world */}
      <Box
        id="printable"
        width={is_screen_sm ? "95%" : "100%"}
        padding={is_screen_sm ? "2rem" : "1rem"}
        margin="0rem"
        marginTop={is_screen_sm ? "0rem" : "4rem"}
        backgroundColor="#FFFFFF"
        boxShadow={shadow}
        // borderRadius="1.2rem"
        // border={`1px solid ${primarycolor}`}
        borderRadius={radius}
        // border={`1px solid ${primarycolor}`}
        borderTop={borderTop}
      >
        <billing-info-section className="billing_info">
          <div className="container">
            <div className="row">
              {/* company logo */}
              <div className="col-12 col-md-6 mt-3 mb-md-3">
                <img
                  src="./asset/footer linkedin.png"
                  alt="placeholder"
                  style={{
                    backgroundColor: "black",
                    border: "2px solid red",
                    width: "10rem",
                    marginBottom: "1rem",
                  }}
                />
                <h5 className="mt-5">Order Info:</h5>
                <h6>Invoice No. : {transactiondata.invoice_number}</h6>
                <h6>Date: {transactiondata.date}</h6>
                <h6>Reseller ID: {orgdata.org_id}</h6>
              </div>
              {/* billing address and name */}
              <div className=" mb-5 mt-5 col-12 col-md-6 text-md-end ">
                <div>
                  <h5 className="mt-md-5 mb-3">Invoice To:</h5>
                  <h6>{orgdata.name}</h6>
                  <h6>
                    {orgdata.city}-{orgdata.pincode}
                  </h6>
                  <h6>{orgdata.address1}</h6>
                  <h6>
                    +{orgdata.country}-{orgdata.phone}
                  </h6>
                  <h6>{orgdata.tax_id}</h6>
                </div>
              </div>
            </div>
          </div>
        </billing-info-section>
        {/* table in middle */}
        <subscription-info-section>
          <div className="container">
            <div className="row">
              <div className="col table-responsive">
                <table className="table table-responsive table-hover table-striped table-bordered border-secondary">
                  <thead>
                    <tr
                      style={{
                        color: "white",
                        backgroundColor: primarycolor,
                      }}
                    >
                      <th scope="col" />
                      <th scope="col" colSpan={2}>
                        Sr No.
                      </th>
                      <th scope="col">DESCREPTION</th>
                      <th scope="col">SAC CODE</th>
                      <th scope="col">NET</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row" />
                      <td colSpan={2}>1</td>
                      <td>1</td>
                      <td>$22.40 USD</td>
                      <td>
                        {transactiondata.currency_symbol}
                        {transactiondata.net_amount}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" />
                      <td colSpan={4} className="text-end">
                        GST : 18%
                      </td>
                      <td>
                        {transactiondata.currency_symbol}{" "}
                        {calculat_percentage(18, transactiondata.net_amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* showing total price */}
              <div className="col-12 table-responsive">
                <table className="table table-hover table-striped table-bordered border-secondary">
                  <tbody>
                    <tr
                      style={{
                        color: "white",
                        backgroundColor: primarycolor,
                      }}
                    >
                      <th scope="row" />
                      <td
                        style={{
                          color: "white",
                        }}
                        colSpan={12}
                        className="fw-bold"
                      >
                        Total
                      </td>
                      <th scope="col" colSpan={12} />
                      <td
                        className="text-end"
                        style={{
                          color: "white",
                        }}
                      >
                        {transactiondata.currency_symbol}{" "}
                        {totalAmount(18, transactiondata.net_amount, 0)}
                      </td>
                      <td scope="col" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </subscription-info-section>
        {/* payment options like paypal visa etc.. */}

        {/* details on bottom */}
        <footer>
          <div className="container">
            <div className="row">
              {/* company logo */}
              <div className="col">
                <Box component="h4" margin="2rem">
                  Instruction:
                </Box>
                <Box marginLeft={is_screen_sm ? "1ren" : "-1rem"}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon fontSize="1rem"></FiberManualRecordIcon>
                      </ListItemIcon>
                      {/* <ListItemText primary="Single-line item" /> */}
                      Send your draft / Pay Order / Cheque / e-Payment in the
                      name of Own Web Solution Private Limited payable at
                      Mumbai.{" "}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon fontSize="1rem"></FiberManualRecordIcon>
                      </ListItemIcon>
                      {/* <ListItemText primary="Single-line item" /> */}
                      Non-payment within 7 days will return in suspension of the
                      services automatically without notice.{" "}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon fontSize="1rem"></FiberManualRecordIcon>
                      </ListItemIcon>
                      {/* <ListItemText primary="Single-line item" /> */}.
                      Mumbai Jurisdiction only.
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon fontSize="1rem"></FiberManualRecordIcon>
                      </ListItemIcon>
                      {/* <ListItemText primary="Single-line item" /> */}
                      PAN of our Company is AADCO6118K
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon fontSize="1rem"></FiberManualRecordIcon>
                      </ListItemIcon>
                      {/* <ListItemText primary="Single-line item" /> */}
                      All payment of this invoice is subjected to applicable TDS
                      provisions of to the buyer.
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FiberManualRecordIcon fontSize="1rem"></FiberManualRecordIcon>
                      </ListItemIcon>
                      {/* <ListItemText primary="Single-line item" /> */}
                      Please note for auto GST Input Credit is only available to
                      those buyers who have already updated their GSTIN with our
                      portal and those who wanted to claim GST Input Credit
                      off-line are advised to file/upload GSTR 2A with GST
                      Portal and intimate to Accounts Department at
                      billing@connectreseller.com{" "}
                    </ListItem>
                  </List>
                </Box>
              </div>
            </div>
          </div>
        </footer>
        <Button
          id="printButton"
          variant="contained"
          onClick={() => {
            let originalContent = document.body.innerHTML;

            let printable = document.getElementById("printable");
            printable.querySelector("#printButton").remove();
            let printableContent = printable.innerHTML;

            document.body.innerHTML = printableContent;
            window.print();
            document.body.innerHTML = originalContent;
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
          Print
        </Button>
      </Box>
    </>
  );
}

// return (
//   <Box margin="2rem">
//     <Box display="flex" justifyContent="space-between" marginBottom="1rem">
//       <h3>Invoice Detail</h3>
//     </Box>
//     <form onSubmit={handleSubmit}>
//       {/* <Grid item xs={6} md={4}>
//         <TextField
//           id="name-input"
//           label="Invoice Number"
//           variant="outlined"
//           name="invoice_number"
//           placeholder="Enter Invoice Number"
//           value={values.invoice_number}
//           onChange={handleChange}
//           required
//           style={{ width: "100%", marginBottom: "1rem" }}
//           onBlur={handleBlur}
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//       </Grid> */}
//       {/* {transactiondata.invoice_number ? ( */}
//       <Box>
//         <Grid container spacing={2}>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="org-input"
//               label="Date Time"
//               variant="outlined"
//               name="date"
//               value={transactiondata.date || "unknown"}
//               disabled
//               style={{ width: "100%", marginBottom: "1rem" }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="name-input"
//               label="Reference Number"
//               variant="outlined"
//               value={transactiondata.invoice_number}
//               onChange={handleChange}
//               style={{ width: "100%", marginBottom: "1rem" }}
//               disabled
//               onBlur={handleBlur}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="address2-input"
//               label="Gateway"
//               variant="outlined"
//               name="status"
//               value={transactiondata.status || "unknown"}
//               onChange={handleChange}
//               style={{ width: "100%", marginBottom: "1rem" }}
//               disabled
//               onBlur={handleBlur}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="address1-input"
//               label="Password"
//               variant="outlined"
//               name="password"
//               value={transactiondata.password || "unknown"}
//               onChange={handleChange}
//               disabled
//               style={{ width: "100%", marginBottom: "1rem" }}
//               onBlur={handleBlur}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="state-input"
//               label="Amount"
//               variant="outlined"
//               name="amount"
//               value={transactiondata.amount || "unknown"}
//               onChange={handleChange}
//               style={{ width: "100%", marginBottom: "1rem" }}
//               disabled
//               onBlur={handleBlur}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="country-input"
//               label="Currency"
//               variant="outlined"
//               name="currency"
//               value={transactiondata.currency || "unknown"}
//               onChange={handleChange}
//               style={{ width: "100%", marginBottom: "1rem" }}
//               disabled
//               onBlur={handleBlur}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="phone-input"
//               label="Currency Symbol"
//               variant="outlined"
//               name="currency_symbol"
//               disabled
//               value={transactiondata.currency_symbol || "unknown"}
//               style={{ width: "100%", marginBottom: "1rem" }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="taxid-input"
//               label="Applicable Tax"
//               variant="outlined"
//               name="applicable_tax"
//               disabled
//               value={transactiondata.applicable_tax || "unknown"}
//               style={{ width: "100%", marginBottom: "1rem" }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="pincode-input"
//               label="Tax"
//               variant="outlined"
//               name="tax"
//               disabled
//               value={transactiondata.tax || "unknown"}
//               style={{
//                 width: "100%",
//                 marginBottom: "1rem",
//               }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="currency-input"
//               label="Net Amount"
//               variant="outlined"
//               name="net_amount"
//               disabled
//               value={transactiondata.net_amount || "unknown"}
//               style={{ width: "100%", marginBottom: "1rem" }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <TextField
//               id="city-input"
//               label="Transaction ID"
//               variant="outlined"
//               name="transaction_id"
//               value={transactiondata.transaction_id || "unknown"}
//               onChange={handleChange}
//               style={{ width: "100%", marginBottom: "1rem" }}
//               disabled
//               onBlur={handleBlur}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item xs={6} md={4}>
//             <Link to={transactiondata.url}> Go to invoice</Link>
//           </Grid>
//         </Grid>
//       </Box>
//       {/* ) : null} */}

//       <Box display="flex" justifyContent="start">
//         <Button
//           variant="contained"
//           type="submit"
//           style={{
//             padding: "0.5rem",
//             paddingLeft: "1rem",
//             paddingRight: "1rem",
//             color: "white",
//             backgroundColor: primarycolor,
//             marginBottom: "1rem",
//             borderRadius: "0.5rem",
//           }}
//         >
//           Get data
//         </Button>
//       </Box>
//     </form>
//   </Box>
// );

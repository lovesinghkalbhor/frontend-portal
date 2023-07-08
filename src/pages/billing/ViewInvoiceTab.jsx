import { React, useState, useEffect, useContext } from "react";
import { Box, Button, Divider } from "@mui/material";
import {
  primarycolor,
  shadow,
  radius,
  borderTop,
} from "../../components/variable";
import { calculat_percentage, totalAmount } from "./helperfunction";
import { useFormik } from "formik";
import { viewInvoice } from "../global component/data_fetching_components/billing_endpoints";
import { globalcontext } from "../../routes/controler";
import { OrgEndpoint } from "../global component/data_fetching_components/org";

export default function ViewInvoice() {
  const [transactiondata, settransactiondata] = useState({});
  const {
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
        borderRadius={radius}
        borderTop={borderTop}
      >
        <billing-info-section className="billing_info">
          <div className="container">
            <div className="row">
              {/* company logo */}
              <div className="mt-4 col-12 col-md-6 mt-3 mb-md-3">
                <img
                  src="/meta.png"
                  alt="placeholder"
                  style={{
                    width: "15rem",
                    marginBottom: "1rem",
                  }}
                />
              </div>
              <div className=" mt-5 col-12 col-md-6 text-md-end ">
                <h6>Invoice No. : {transactiondata.invoice_number}</h6>
                <h6>Date: {transactiondata.date}</h6>
                <h6>Reseller ID: {orgdata.org_id}</h6>
              </div>
              <Divider light={false} sx={{ opacity: 1 }}></Divider>
              {/* billing address and name */}
              <div className=" mb-5 mt-3 col-12 col-md-6 ">
                <div>
                  <h5 className="mt-md-5 mb-3">
                    Own Web Solution Private Limited
                  </h5>
                  <h6>31-A, Govindpuri-H,</h6>
                  <h6>Swej Farm, Jaipur,</h6>
                  <h6>RJ, India (302019),</h6>
                  <h6>GSTIN:</h6>
                  <h6>CIN: </h6>
                </div>
              </div>
              <div className=" mb-5 mt-3 col-12 col-md-6 text-md-end ">
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
        {/*  */}
        <Button
          id="printButton"
          variant="contained"
          onClick={() => {
            window.open(transactiondata.url);
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

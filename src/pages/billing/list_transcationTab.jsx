import { Box } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
// import { orgcontext } from "./organization page";
import DataTable from "../../components/datatable";
import { listTransactions } from "../global component/data_fetching_components/billing_endpoints";

export default function ListTranscationTab(props) {
  const [Transactionslist, setTransactionslist] = useState({});
  const [column, setcolumn] = useState([]);
  // const { orgdata } = useContext(orgcontext);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "reference_number", headerName: "Reference Number", width: 130 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "gateway", headerName: "Gateway", width: 150 },
    {
      field: "gateway_ref",
      headerName: "Gateway Ref",
      width: 160,
    },
    { field: "amount", headerName: "Amount", width: 100 },
    { field: "currency", headerName: "Currency", width: 100 },
    { field: "currency_symbol", headerName: "Currency Symbol", width: 150 },
    { field: "applicable_tax", headerName: "Applicable Tax", width: 150 },
    { field: "tax", headerName: "Tax", width: 200 },
    { field: "net_amount", headerName: "Net Amount", width: 150 },
    { field: "datetime", headerName: "Datetime", width: 200 },
  ];

  // const initialValues = {
  //   current_password: "",
  //   new_password: "",
  //   confirm_password: "",
  // };
  // const { values, errors, handleBlur, handleChange, handleSubmit, setValues } =
  //   useFormik({
  //     initialValues: initialValues,
  //     onSubmit: (values) => {
  //       console.log(values);
  //       // let a = updateprofiledata(
  //       //   values.firstname,
  //       //   values.lastname,
  //       //   values.email
  //       // );

  //       console.log(values, "called data update");
  //     },
  //   });
  async function getTransactionslist() {
    let data = await listTransactions();
    if (data.status === 1) {
      setTransactionslist(data.billing);
      console.log(
        Transactionslist,
        "this is the transaction list of the data "
      );
    }
  }

  useEffect(() => {
    getTransactionslist();
    setcolumn(columns);
  }, []);
  // console.log(orguserdata, "thisjfsidfjkjeotiejrgdkjfgsjetrg");

  return (
    <>
      <Box width="100%">
        <DataTable datarow={Transactionslist} datacolumn={column}></DataTable>
      </Box>
    </>
  );
}

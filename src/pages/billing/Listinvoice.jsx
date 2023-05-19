import { Box } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import { invoiceList } from "../global component/data_fetching_components/billing_endpoints";
import DataTable from "../../components/datatable";
// import { listTransactions } from "../global component/data_fetching_components/billing_endpoints";

export default function ListInvoice(props) {
  const [Invoicelist, setInvoicelist] = useState([]);
  const [column, setcolumn] = useState([]);
  // const { orgdata } = useContext(orgcontext);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    { field: "transaction_id", headerName: "Transaction Id", width: 200 },

    { field: "invoice_number", headerName: "Invoice Number", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "password",
      headerName: "Password",
      width: 160,
    },
    { field: "amount", headerName: "Amount", width: 100 },
    { field: "currency", headerName: "Currency", width: 100 },
    { field: "currency_symbol", headerName: "Currency Symbol", width: 150 },
    { field: "applicable_tax", headerName: "Applicable Tax", width: 150 },
    { field: "tax", headerName: "Tax", width: 250 },
    { field: "net_amount", headerName: "Net Amount", width: 150 },
  ];
  async function getInvoicelist() {
    let data = await invoiceList();
    if (data.status === 1) {
      setInvoicelist(data.invoice);
      console.log(Invoicelist, "THIS IS INVOICE LIST OF THE DAA  ");
    }
  }

  useEffect(() => {
    getInvoicelist();
    setcolumn(columns);
  }, []);
  // console.log(orguserdata, "thisjfsidfjkjeotiejrgdkjfgsjetrg");

  return (
    <>
      <Box width="100%">
        <DataTable datarow={Invoicelist} datacolumn={column}></DataTable>
      </Box>
    </>
  );
}

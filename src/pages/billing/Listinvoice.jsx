import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { invoiceList } from "../global component/data_fetching_components/billing_endpoints";
import DataTable from "../../components/datatable";
import { Link } from "react-router-dom";
import { primarycolor } from "../../components/variable";

// columns the required in DataGrid

export default function ListInvoice(props) {
  const [Invoicelist, setInvoicelist] = useState("");
  const [column, setcolumn] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "invoice_number",
      headerName: "Invoice Number",
      width: 150,
      renderCell: (params) => (
        <Link
          style={{ color: primarycolor }}
          to={`/billing/invoice?invoice_number=${params.value}`}
        >
          {params.value}
        </Link>
      ),
    },
    { field: "transaction_id", headerName: "Transaction Id", width: 200 },

    { field: "status", headerName: "Status", width: 100 },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      valueGetter: (params) =>
        `${params.row.currency_symbol} ${params.row.amount}`,
    },
    { field: "currency", headerName: "Currency", width: 100 },
    // { field: "tax", headerName: "Tax", width: 250 },
    // { field: "net_amount", headerName: "Net Amount", width: 150 },
  ];
  /**this function handels the async behaviour invoiceList function*/
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

  return (
    <>
      <Box width="100%">
        <DataTable datarow={Invoicelist} datacolumn={column}></DataTable>
      </Box>
    </>
  );
}

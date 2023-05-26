import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DataTable from "../../components/datatable";
import { listTransactions } from "../global component/data_fetching_components/billing_endpoints";
import { primarycolor } from "../../components/variable";
// columns the required in DataGrid
import { Link } from "react-router-dom";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "reference_number",
    headerName: "Reference Number",
    width: 130,
    renderCell: (params) => (
      <Link
        style={{ color: primarycolor }}
        to={`/billing/transcation?reference_number=${params.value}`}
      >
        {params.value}
      </Link>
    ),
  },
  { field: "gateway", headerName: "Gateway", width: 150 },
  { field: "gateway_ref", headerName: "Gateway Ref", width: 160 },
  {
    field: "amount",
    headerName: "Amount",
    width: 120,
    valueGetter: (params) =>
      `${params.row.currency_symbol} ${params.row.amount}`,
  },
  { field: "currency", headerName: "Currency", width: 100 },
  { field: "tax", headerName: "Tax", width: 200 },
  {
    field: "net_amount",
    headerName: "Net Amount",
    width: 150,
    valueGetter: (params) =>
      `${params.row.currency_symbol} ${params.row.net_amount}`,
  },
  { field: "datetime", headerName: "Datetime", width: 200 },
];

export default function ListTranscationTab(props) {
  const [Transactionslist, setTransactionslist] = useState({});
  const [column, setcolumn] = useState([]);

  /**this function handels the async behaviour listTransactions function*/
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
  return (
    <>
      <Box width="100%">
        <DataTable datarow={Transactionslist} datacolumn={column}></DataTable>
      </Box>
    </>
  );
}

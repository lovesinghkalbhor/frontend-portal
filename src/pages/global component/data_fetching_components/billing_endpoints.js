import axios from "axios";
import Cookies from "js-cookie";

// get billing data

const billing_view_Data = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);

  try {
    const userdata = await axios.post(
      "http://localhost:5000/billing/viewFunds",
      { session_id }
    );

    data = userdata.data;
    console.log(data, "this is billing end point andh what about you tell me ");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
const listTransactions = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);

  try {
    const userdata = await axios.post(
      "http://localhost:5000/billing/listTransactions",
      { session_id }
    );

    data = userdata.data;
    console.log(data, "this is billing end point andh what about you tell me ");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
const viewTransaction = async (reference_number) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  const requestBody = {
    session_id,
    reference_number,
  };

  try {
    const userdata = await axios.post(
      "http://localhost:5000/billing/viewTransaction",
      requestBody
    );

    data = userdata.data;
    console.log(data, "this is billing end point andh what about you tell me ");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
const viewInvoice = async (invoice_number) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  const requestBody = {
    session_id,
    invoice_number,
  };

  try {
    const userdata = await axios.post(
      "http://localhost:5000/billing/viewInvoice",
      requestBody
    );

    data = userdata.data;
    console.log(data, "this is billing end point andh what about you tell me ");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
const AddFund = async (amount) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  const requestBody = {
    session_id,
    amount,
  };

  try {
    const userdata = await axios.post(
      "http://localhost:5000/billing/addFunds",
      requestBody
    );

    data = userdata.data;
    console.log(
      data,
      "this is addFunds end point andh what about you tell me "
    );
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};

const invoiceList = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  const requestBody = {
    session_id,
  };

  try {
    const userdata = await axios.post(
      "http://localhost:5000/billing/listInvoices",
      requestBody
    );

    data = userdata.data;
    console.log(
      data,
      "LIST OF INVOICES LLLLLLLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSSSSSS"
    );
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};

export {
  billing_view_Data,
  listTransactions,
  viewTransaction,
  invoiceList,
  viewInvoice,
  AddFund,
};

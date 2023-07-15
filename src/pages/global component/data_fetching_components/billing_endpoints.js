import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../../../components/variable";

/**This function gives the data of available fund*/
const billing_view_Data = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);

  try {
    const userdata = await axios.post(
      `${url}/billing/viewFunds`,
      {
        session_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    data = userdata.data;
    console.log(data, "this is billing end point andh what about you tell me ");
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/**This function give the list of transcation  */
const listTransactions = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);

  try {
    const userdata = await axios.post(
      `${url}/billing/listTransactions`,
      {
        session_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    data = userdata.data;
    console.log(data, "this is billing end point andh what about you tell me ");
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/** This function gives the transaction details of the perticular transaction  */
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
      `${url}/billing/viewTransaction`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    data = userdata.data;
    console.log(data, "this is billing end point andh what about you tell me ");
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/**This function gives the Invoice of perticular transcation */
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
      `${url}/billing/viewInvoice`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    data = userdata.data;
    console.log(data, "this is billing end point andh what about you tell me ");
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};
/** THis function is use to add the funds */
const AddFund = async (amount) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  const requestBody = {
    session_id,
    amount,
  };

  try {
    const userdata = await axios.post(`${url}/billing/addFunds`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    data = userdata.data;
    console.log(
      data,
      "this is addFunds end point andh what about you tell me "
    );
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/** function give the list of invoices */
const invoiceList = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  const requestBody = {
    session_id,
  };

  try {
    const userdata = await axios.post(
      `${url}/billing/listInvoices`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    data = userdata.data;
    console.log(
      data,
      "LIST OF INVOICES LLLLLLLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSSSSSS"
    );
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
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

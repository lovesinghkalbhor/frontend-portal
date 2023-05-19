const express = require("express");
const app = express();
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// get the url form the .env file
let url = process.env.BASE_URL;

// for getting the org info
router.post("/viewFunds", async (req, res) => {
  const apiUrl = `${url}/billing/viewFunds`;
  // an object that contain all the data the is required to api
  const requestBody = {
    session_id: req.body.session_id,
  };
  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(data, "this is billing information");
    res.send(data);
    // console.log(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});

router.post("/listTransactions", async (req, res) => {
  const apiUrl = `${url}/billing/listTransactions`;
  // an object that contain all the data the is required to api
  const requestBody = {
    session_id: req.body.session_id,
  };
  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // JSON.parse(response);
    const data = response.data;

    res.send(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});

router.post("/listInvoices", async (req, res) => {
  const apiUrl = `${url}/billing/listInvoices`;
  // an object that contain all the data the is required to api
  const requestBody = {
    session_id: req.body.session_id,
  };
  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // JSON.parse(response);
    const data = response.data;
    console.log(
      data,
      "LIST OF INVOICES LLLLLLLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSSSSSS"
    );
    res.send(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});

router.post("/viewInvoice", async (req, res) => {
  const apiUrl = `${url}/billing/viewInvoice`;
  // an object that contain all the data the is required to api
  const requestBody = {
    session_id: req.body.session_id,
    invoice_number: req.body.invoice_number,
  };
  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // JSON.parse(response);
    const data = response.data;
    console.log(
      data,
      "LIST OF INVOICES LLLLLLLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSSSSSS"
    );
    res.send(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});
router.post("/addFunds", async (req, res) => {
  const apiUrl = `${url}/billing/addFunds`;
  // an object that contain all the data the is required to api
  const requestBody = {
    session_id: req.body.session_id,
    amount: req.body.amount,
  };
  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // JSON.parse(response);
    const data = response.data;
    console.log(
      data,
      "LIST OF INVOICES LLLLLLLLLLLLLLLLLLLLLLLLLSSSSSSSSSSSSSSSSS"
    );
    res.send(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});
router.post("/viewTransaction", async (req, res) => {
  const apiUrl = `${url}/billing/viewTransaction`;
  // an object that contain all the data the is required to api
  const requestBody = {
    session_id: req.body.session_id,
    reference_number: req.body.reference_number,
  };
  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // JSON.parse(response);
    const data = response.data;

    res.send(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});

module.exports = router;

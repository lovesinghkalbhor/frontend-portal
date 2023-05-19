const express = require("express");
const app = express();
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// get the url form the .env file
let url = process.env.BASE_URL;

// for getting the user info
router.post("/view", async (req, res) => {
  const apiUrl = `${url}/me/view`;
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
    console.log(data);
    res.send(data);
    // console.log(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});

// for updating the user info
router.post("/update", async (req, res) => {
  const apiUrl = `${url}/me/update`;
  // an object that contain all the data the is required to api
  const requestBody = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    session_id: req.body.session_id,
    email: req.body.email,
    "2fa": req.body.two_factor_authentication,
  };
  // Make the POST request with Axios
  try {
    console.log("in me update");
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(data);
    res.send(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});

module.exports = router;

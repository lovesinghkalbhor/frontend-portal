const express = require("express");
const app = express();
const axios = require("axios");

const router = express.Router();

// login api
router.post("/view", async (req, res) => {
  const apiUrl = "https://aditya1.staging.cloudmate.in/me/view"; // Replace with your actual API URL

  // Create a JSON object with the request parameters
  const requestBody = {
    session_id: req.body.session_id,
  };
  console.log(req.body.session_id);
  //   console.log(requestBody.session_id);

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
router.post("/update", async (req, res) => {
  const apiUrl = "https://aditya1.staging.cloudmate.in/me/update"; // Replace with your actual API URL
  console.log("in server update");
  // Create a JSON object with the request parameters

  // Make the POST request with Axios
  try {
    const requestBody = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      session_id: req.body.session_id,
      email: req.body.email,
      "2fa": req.body.two_factor_authentication,
    };
    console.log("in me update");
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

module.exports = router;

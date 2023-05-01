const express = require("express");
const app = express();
const axios = require("axios");

const router = express.Router();

// login api
router.post("/login", async (req, res) => {
  const apiUrl = "https://aditya1.staging.cloudmate.in/auth/login"; // Replace with your actual API URL

  // Create a JSON object with the request parameters
  const requestBody = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(requestBody.email, requestBody.password);

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
// reset email send    /reset
router.post("/reset", async (req, res) => {
  const apiUrl = "https://aditya1.staging.cloudmate.in/auth/reset"; // Replace with your actual API URL
  console.log("reset called here");

  // Create a JSON object with the request parameters
  const requestBody = {
    email: req.body.email,
  };
  console.log(requestBody.email);

  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(data, "reset");
    res.send(data);
    // console.log(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});
// reset password   /reset
router.post("/reset2", async (req, res) => {
  const apiUrl = "https://aditya1.staging.cloudmate.in/auth/reset2"; // Replace with your actual API URL
  console.log("reset called here");

  // Create a JSON object with the request parameters
  const requestBody = {
    vcode: req.body.vcode,
    vcode2: req.body.vcode2,
    email: req.body.email,
    new_password: req.body.password,
  };
  console.log(requestBody);

  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(data, "reset");
    res.send(data);
    // console.log(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});

// logout
router.post("/logout", async (req, res) => {
  const apiUrl = "https://aditya1.staging.cloudmate.in/auth/logout"; // Replace with your actual API URL

  // Create a JSON object with the request parameters
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

// loguutall
router.post("/logoutall", async (req, res) => {
  const apiUrl = "https://aditya1.staging.cloudmate.in/auth/logoutall"; // Replace with your actual API URL

  // Create a JSON object with the request parameters
  const requestBody = {
    email: req.body.email,
    password: req.body.password,
  };

  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    console.log(data, "logotu all the data");
    res.send(data);
    // console.log(data);
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
});

router.post("/status", async (req, res) => {
  const apiUrl = "https://aditya1.staging.cloudmate.in/auth/status"; // Replace with your actual API URL

  // Create a JSON object with the request parameters
  const requestBody = {
    session_id: req.body.session_id,
  };
  console.log(requestBody.session_id);

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

module.exports = router;

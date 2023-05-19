import axios from "axios";
import Cookies from "js-cookie";

const Logindata = async (email, password) => {
  const apiUrl = "http://localhost:5000/auth/login"; // Replace with your actual API URL
  console.log("in login");
  // Create a JSON object with the request parameters
  const requestBody = {
    email: email,
    password: password,
  };

  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
};

const Send_reset_email = async (email) => {
  const apiUrl = "http://localhost:5000/auth/reset"; // Replace with your actual API URL
  console.log("in login");
  // Create a JSON object with the request parameters
  const requestBody = {
    email: email,
  };

  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
};
const Reset_password = async (vcode, vcode2, hashedEmail, password) => {
  const apiUrl = "http://localhost:5000/auth/reset2"; // Replace with your actual API URL
  console.log("in login");
  // Create a JSON object with the request parameters
  const requestBody = {
    vcode: vcode,
    vcode2: vcode2,
    email: hashedEmail,
    password: password,
  };

  // Make the POST request with Axios
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    // Handle any error during the request
    console.error("Error:", error);
  }
};

const is_user_session_valid = async () => {
  const session_id = Cookies.get("session_id");
  // console.log(session_id, "session_id,here");

  const apiUrl = "http://localhost:5000/auth/status"; // Replace with your actual API URL
  console.log("in login");
  // Create a JSON object with the request parameters
  let data = {};

  try {
    const userdata = await axios.post(apiUrl, {
      session_id,
    });
    data = userdata.data;
    // console.log(data, "valid or not");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};

const Logoutfunction = async () => {
  const session_id = Cookies.get("session_id");
  // console.log(session_id, "session_id,here");

  const apiUrl = "http://localhost:5000/auth/logout"; // Replace with your actual API URL
  // console.log("in login");
  // Create a JSON object with the request parameters
  let data = {};

  try {
    const userdata = await axios.post(apiUrl, {
      session_id,
    });
    data = userdata.data;
    // console.log(data, "valid or not");
    Cookies.remove("session_id");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
const Logoutallfunction = async (email, password) => {
  const apiUrl = "http://localhost:5000/auth/logoutall"; // Replace with your actual API URL
  console.log("in login");
  // Create a JSON object with the request parameters
  let data = {};
  const requestBody = {
    email: email,
    password: password,
  };
  try {
    const userdata = await axios.post(apiUrl, requestBody);
    data = userdata.data;
    console.log(data, "loguut all ");
    Cookies.remove("session_id");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};

export {
  Logindata,
  is_user_session_valid,
  Logoutfunction,
  Logoutallfunction,
  Send_reset_email,
  Reset_password,
};

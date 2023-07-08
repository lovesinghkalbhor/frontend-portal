import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../../../components/variable";

/** function for calling the login api, require email and password */
const Logindata = async (email, password) => {
  const apiUrl = `${url}/auth/login`;
  console.log("in login");
  const requestBody = {
    email: email,
    password: password,
  };
  let data = {};
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = response.data;
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};
const TwoFactorAuth = async (passcode) => {
  const apiUrl = `${url}/auth/twofa`;
  const session_id = Cookies.get("session_id");

  console.log("in login");
  const requestBody = {
    session_id,
    passcode,
  };
  let data = {};
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    data = response.data;
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/** This function send the reset link to your email */
const Send_reset_email = async (email) => {
  const apiUrl = `${url}/auth/reset`;
  console.log("in login");
  const requestBody = {
    email: email,
  };
  let data = {};
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    data = response.data;
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/** This function actualy reset your password */
const Reset_password = async (vcode, vcode2, hashedEmail, password) => {
  const apiUrl = `${url}/auth/reset2`;
  const requestBody = {
    vcode: vcode,
    vcode2: vcode2,
    email: hashedEmail,
    password: password,
  };
  let data = {};
  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    data = response.data;
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/** This function checks if the session is valid or not*/
const is_user_session_valid = async () => {
  const session_id = Cookies.get("session_id");
  const apiUrl = `${url}/auth/status`;
  console.log("in login");
  let data = {};
  try {
    const userdata = await axios.post(apiUrl, {
      session_id,
    });
    data = userdata.data;
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/** This function logout the user */
const Logoutfunction = async () => {
  const session_id = Cookies.get("session_id");
  const apiUrl = `${url}/auth/logout`;
  let data = {};
  try {
    const userdata = await axios.post(apiUrl, {
      session_id,
    });
    data = userdata.data;
    // Cookies.remove("session_id");
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/** This function logout the user form all the devices */
const Logoutallfunction = async (email, password) => {
  const apiUrl = `${url}/auth/logoutall`;
  console.log("in login");
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
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
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
  TwoFactorAuth,
};

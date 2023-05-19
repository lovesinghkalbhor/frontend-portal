import axios from "axios";
import Cookies from "js-cookie";

// get organization data
const OrgEndpoint = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  // console.log(session_id);
  // console.log("in me react");
  try {
    const userdata = await axios.post("http://localhost:5000/org/view", {
      session_id,
    });

    data = userdata.data;
    // console.log(data, "50000000000000000000sdffffffffffffff");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
// Me_Endpoint();

// update organization data
const UpdateOrgData = async (...orgdata) => {
  const session_id = Cookies.get("session_id");

  let data = {
    session_id,
    ...orgdata[0],
  };
  // console.log(
  //   data,
  //   "it is hrtetfghfgjghkjhkhjklgkyutyu 1111111111111111111111111111000000000000000000000000"
  // );
  let upadtedData = {};
  try {
    const userdata = await axios.post("http://localhost:5000/org/update", data);
    upadtedData = userdata;
  } catch (err) {
    upadtedData.error = "Failed to fetch data. Please try again later.";
  }

  return upadtedData.data;
};

// get user data in the organization
const OrgUserData = async (org_id) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post("http://localhost:5000/org/getUsers", {
      session_id,
      org_id,
    });

    data = userdata.data;
    console.log(data, "50000000000000000000sdffffffffffffff");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
const SuspendUser = async (org_id, user_id) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post(
      "http://localhost:5000/org/suspendUsers",
      {
        session_id,
        org_id,
        user_id,
      }
    );

    data = userdata.data;
    console.log(data, "50000000000000000000sdffffffffffffff");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
const RevokeUser = async (org_id, user_id) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post("http://localhost:5000/org/revokeUsers", {
      session_id,
      org_id,
      user_id,
    });

    data = userdata.data;
    console.log(data, "50000000000000000000sdffffffffffffff");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
const SearchUser = async (org_id, search_data) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post("http://localhost:5000/org/searchUsers", {
      session_id,
      org_id,
      search_data,
    });

    data = userdata.data;
    console.log(data, "50000000000000000000sdffffffffffffff");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
const EditUser = async (org_id, edit_data, user_id) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post("http://localhost:5000/org/editUsers", {
      session_id,
      user_id,
      org_id,
      edit_data,
    });

    data = userdata.data;
    console.log(data, "50000000000000000000sdffffffffffffff");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};

export {
  OrgEndpoint,
  UpdateOrgData,
  OrgUserData,
  SuspendUser,
  RevokeUser,
  SearchUser,
  EditUser,
};

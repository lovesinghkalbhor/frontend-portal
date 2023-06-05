import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../../../components/variable";

/**  This function gives organization data in which you are loged in*/
const OrgEndpoint = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  // console.log(session_id);
  // console.log("in me react");
  try {
    const userdata = await axios.post(`${url}/org/view`, {
      session_id,
    });

    data = userdata.data;
    console.log(data, "50000000000000000000sdffffffffffffff");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};

/**This function update organization data */
const UpdateOrgData = async (orgdata) => {
  const session_id = Cookies.get("session_id");

  console.log(orgdata, "0000000000000000");
  let data = {
    session_id,
    ...orgdata,
  };
  let upadtedData = {};
  try {
    const userdata = await axios.post(`${url}/org/update`, data);
    console.log(userdata);
    upadtedData = userdata;
  } catch (err) {
    upadtedData.error = "Failed to fetch data. Please try again later.";
  }

  return upadtedData.data;
};

/** This function gives the list of user data in the organization*/
const OrgUserData = async (org_id) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post(`${url}/org/getUsers`, {
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

/** This function suspend the perticular user */
const SuspendUser = async (org_id, user_id) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post(`${url}/org/suspendUsers`, {
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
/** This function Revoke the perticular user */
const RevokeUser = async (org_id, user_id) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post(`${url}/org/revokeUsers`, {
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
/** This function use to search the user */
const SearchUser = async (org_id, search_data) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post(`${url}/org/searchUsers`, {
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

/** This function edit the user data from the list of user of org */
const EditUser = async (org_id, edit_data, user_id) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post(`${url}/org/editUsers`, {
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
const AddUser = async (org_id, dataobj) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "this is hte id e fo ,,,,,,,,,,,,,,,,...........");
  console.log(dataobj, "orgdataag");
  const obj = { session_id, org_id: 1, ...dataobj };
  try {
    const userdata = await axios.post(`${url}/org/addUser`, obj);

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
  AddUser,
};

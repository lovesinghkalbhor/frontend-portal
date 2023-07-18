import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../../../components/variable";

/**  This function gives organization data in which you are loged in*/
const OrgEndpoint = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  try {
    const userdata = await axios.post(
      `/org/view`,
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
    console.log(data);
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};

/**This function update organization data */
const UpdateOrgData = async (orgdata) => {
  const session_id = Cookies.get("session_id");

  console.log(orgdata);
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
    const userdata = await axios.post(`/org/getUsers`, {
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
    const userdata = await axios.post(`/org/suspendUsers`, {
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
    const userdata = await axios.post(`/org/revokeUsers`, {
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
const SearchUser = async (org_id, search_array) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(session_id);
  console.log(org_id, "orgdataag");
  try {
    const userdata = await axios.post(`/org/searchUsers`, {
      session_id,
      org_id,
      search_array,
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
    const userdata = await axios.post(`/org/editUsers`, {
      session_id,
      org_id,
      user_id,
      edit: edit_data,
    });

    data = userdata.data;
    console.log(data, "50000000000000000000sdffffffffffffff");
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};

const AddUser = async (dataobj) => {
  let data = {};
  const session_id = Cookies.get("session_id");
  console.log(dataobj, "50000000000000000000sdffffffffffffff");
  const obj = { session_id, ...dataobj };
  try {
    const userdata = await axios.post(`/org/addUser`, obj, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    data = userdata.data;
    console.log(data);
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

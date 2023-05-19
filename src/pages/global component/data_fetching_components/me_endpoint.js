import axios from "axios";
import Cookies from "js-cookie";

const Me_Endpoint = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");
  // console.log(session_id);
  // console.log("in me react");
  try {
    const userdata = await axios.post("http://localhost:5000/me/view", {
      session_id,
    });

    data = userdata.data;
    console.log(data);
  } catch (err) {
    data.error = "Failed to fetch data. Please try again later.";
  }
  return data;
};
// Me_Endpoint();

const updateprofiledata = async (
  first_name,
  last_name,
  email,
  two_factor_authentication = "0"
) => {
  const session_id = Cookies.get("session_id");

  // console.log("in updateprofiledata");
  let upadtedData = {};
  // console.log(first_name, "inupdate first name");
  try {
    const userdata = await axios.post("http://localhost:5000/me/update", {
      session_id,
      first_name,
      last_name,
      email,
      two_factor_authentication,
    });
    upadtedData = userdata;
  } catch (err) {
    upadtedData.error = "Failed to fetch data. Please try again later.";
  }

  return upadtedData.data;
};
// profiledata();set
export { Me_Endpoint, updateprofiledata };

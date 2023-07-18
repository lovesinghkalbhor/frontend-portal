import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../../../components/variable";

/** This function gives he data of loged in user */
const Me_Endpoint = async () => {
  let data = {};
  const session_id = Cookies.get("session_id");

  try {
    const userdata = await axios.post(
      `/me/view`,
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
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }
  return data;
};

/** This function update the userdata */
const updateprofiledata = async (
  first_name,
  last_name,
  email,
  two_factor_authentication = "0"
) => {
  const session_id = Cookies.get("session_id");
  let data = {};
  try {
    const userdata = await axios.post(
      `/me/update`,
      {
        session_id,
        first_name,
        last_name,
        email,
        "2fa": two_factor_authentication,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    data = userdata.data;
  } catch (error) {
    data.servererror = error.message;
    console.error("Error:", error);
  }

  return data;
};
export { Me_Endpoint, updateprofiledata };

import { React, createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Topbar from "../pages/global component/topbar/Topbar";
import Sidemenu from "../pages/global component/sidemenu/Sidemenu";
import { is_user_session_valid } from "../pages/global component/data_fetching_components/auth";
import { Alert, AlertTitle, Box } from "@mui/material";
import { shadow } from "../components/variable";
import Cookies from "js-cookie";
import MainpageControl from "./RoutesComponents/MainpageRoutes";
import LoginSignupRoutes from "./RoutesComponents/LoginSignupRoutes";
import "../pages/global component/css/controler.css";
const globalcontext = createContext();
export default function App() {
  const [userinfo, setuserinfo] = useState({});
  const [orgdata, setorgdata] = useState({ fetched: false });
  const [billinginfo, setbillinginfo] = useState({});
  const [servererror, setservererror] = useState("");
  const [successmessage, setsuccessmessage] = useState(false);
  const [errormessage, seterrormessage] = useState(false);
  const location = useLocation();
  // media query of mui
  const is_screen_sm = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  async function is_session_valid() {
    let a = await is_user_session_valid();
    if (!a.status) {
      navigate("/login");
      return false;
    } else {
      return true;
    }
  }
  const [path, setPath] = useState(false);
  useEffect(
    () => {
      setservererror("");
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/2fa" ||
        location.pathname === "/logoutall"
      ) {
        setPath(false);
      } else {
        setPath(true);
      }
      is_session_valid();
    },
    [location.pathname],

    []
  );
  function logout() {
    navigate("/login");
    Cookies.remove("session_id");
  }
  function renderSuccessAlert(message) {
    return (
      <Alert severity="success" className="alert">
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    );
  }
  function renderErrorAlert(message) {
    return (
      <Alert className="alert" severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    );
  }
  useEffect(() => {
    setTimeout(() => {
      setsuccessmessage("");
      seterrormessage("");
    }, 7000);
  }, [successmessage, errormessage]);

  return (
    <globalcontext.Provider
      value={{
        logout,
        orgdata,
        setorgdata,
        is_screen_sm,
        setuserinfo,
        userinfo,
        billinginfo,
        setbillinginfo,
        servererror,
        setservererror,
        seterrormessage,
        is_session_valid,
        successmessage,
        setsuccessmessage,
      }}
    >
      <div className="controler">
        {/* this is global aler box///////////////////////////////// */}
        {successmessage ? (
          <Box>{renderSuccessAlert(successmessage)}</Box>
        ) : null}
        {errormessage ? <Box>{renderErrorAlert(errormessage)}</Box> : null}

        {/* the page is start form here */}
        <LoginSignupRoutes></LoginSignupRoutes>

        <div className="page-wrapper">
          {/* if path is not login or signup then only show side bar */}
          {is_screen_sm && path ? <Sidemenu></Sidemenu> : null}
          {/* if path is not login or signup then only show main */}
          {path ? (
            <main className="headerAndMain">
              <Topbar></Topbar>
              <div style={{ margin: "1rem" }}>
                <MainpageControl></MainpageControl>{" "}
              </div>
            </main>
          ) : null}
        </div>
      </div>
    </globalcontext.Provider>
  );
}
export { globalcontext };

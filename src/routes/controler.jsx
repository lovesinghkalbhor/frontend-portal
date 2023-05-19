import { React, createContext, useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Login from "../pages/login signup/login/login";
import SignUp from "../pages/login signup/sign up/sign-up";
import Dashboard from "../pages/dashboard/dashboard";
import Topbar from "../pages/global component/topbar/Topbar";
import Sidemenu from "../pages/global component/sidemenu/Sidemenu";
import PlaceOrders from "../pages/place order/place_order_page.jsx";
import Domain from "../pages/Domain/Domain";
import Customer from "../pages/customer/customer";
import Billing from "../pages/billing/billing";
import DomainTransferList from "../pages/tools/DomainTransferlist/Domain_TransferOut_List";
import PendingBulkSummary from "../pages/tools/pendingsummary/Pendingsummary";
import Actionhistory from "../pages/tools/ActionHistory/Actionhistory";
import Domainpullrequest from "../pages/tools/Domainpullrequest/domainpullrequest";
import Reports from "../pages/tools/reports/reports";
import BulkActionUpload from "../pages/tools/bulk action upload/bulk action";
import Profile from "../pages/profile/profile page";
import { is_user_session_valid } from "../pages/global component/data_fetching_components/auth";
import Logoutall from "../pages/login signup/logoutall/logoutall";
import ChangePassword from "../pages/reset password/reset";
import OrganizationPage from "../pages/organization detail/organization page";
import { Alert, AlertTitle, Box } from "@mui/material";
// const AppContext = createContext();
import AddFunds from "../pages/billing/addfund";
import UpdateUser from "../pages/organization detail/updateUserTab";

const globalcontext = createContext();
export default function App() {
  const [userinfo, setuserinfo] = useState({});
  const [orgdata, setorgdata] = useState({});
  const [billinginfo, setbillinginfo] = useState({});
  const [servererror, setservererror] = useState("");
  const [successmessage, setsuccessmessage] = useState(false);
  // const updateddata = updateprofiledata()
  const location = useLocation();
  // this is global context data like media query
  // media query of mui
  const is_screen_sm = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  async function is_session_valid() {
    let a = await is_user_session_valid();
    if (!a.status) {
      navigate("/login");
    }
  }
  const [path, setPath] = useState(false);
  useEffect(
    () => {
      // this is
      if (
        // location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
        // location.pathname === "/logoutall"
      ) {
        setPath(false);
      } else {
        setPath(true);
      }
    },
    [location.pathname],
    []
  );
  function renderSuccessAlert(message) {
    return (
      <Alert
        severity="success"
        style={{
          position: "fixed",
          zIndex: 1000,
          width: "100%",
          marginTop: "1rem",
          // backgroundColor: "#9CFF2E",
          // color: "white",
        }}
      >
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    );
  }
  useEffect(() => {
    setTimeout(() => {
      setsuccessmessage("");
    }, 5000);

    // renderSuccessAlert(successmessage);
  }, [successmessage]);

  return (
    <globalcontext.Provider
      value={{
        orgdata,
        setorgdata,
        is_screen_sm,
        setuserinfo,
        userinfo,
        billinginfo,
        setbillinginfo,
        servererror,
        setservererror,
        is_session_valid,
        successmessage,
        setsuccessmessage,
      }}
    >
      {/* this is global aler box///////////////////////////////// */}
      {successmessage ? <Box>{renderSuccessAlert(successmessage)}</Box> : null}
      {/* the page is start form here */}
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {is_screen_sm && path ? <Sidemenu></Sidemenu> : null}
        <main
          className="content"
          style={{ width: "100%", height: "100%", overflowX: "auto" }}
        >
          {path ? <Topbar></Topbar> : ""}
          <div style={{ margin: "1rem" }}>
            <Routes>
              <Route exact path="/" element={<Dashboard />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route>

              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/place_orders" element={<PlaceOrders />}></Route>
              <Route path="/domain" element={<Domain />}></Route>
              <Route path="/customer" element={<Customer />}></Route>
              <Route path="/billing" element={<Billing />}></Route>
              <Route path="/profile" element={<Profile></Profile>} />
              <Route path="/addfund" element={<AddFunds></AddFunds>} />
              <Route
                path="/org"
                element={<OrganizationPage></OrganizationPage>}
              />
              <Route path="/org/update" element={<UpdateUser></UpdateUser>} />
              <Route
                path="/reset"
                element={<ChangePassword></ChangePassword>}
              />
              <Route exact path="/logoutall" element={<Logoutall />}></Route>
              <Route path="/tools">
                <Route
                  path="domain-transferout-list"
                  element={<DomainTransferList />}
                />
                <Route
                  path="pending-bulk-summary"
                  element={<PendingBulkSummary />}
                />
                <Route path="action-history" element={<Actionhistory />} />
                <Route
                  path="domain-pull-request"
                  element={<Domainpullrequest></Domainpullrequest>}
                />
                <Route path="reports" element={<Reports></Reports>} />
                <Route
                  path="bulk-action-file"
                  element={<BulkActionUpload></BulkActionUpload>}
                />
              </Route>
            </Routes>
          </div>
        </main>
      </div>
    </globalcontext.Provider>
  );
}
export { globalcontext };

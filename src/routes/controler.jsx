import { React, createContext, useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import Login from "../pages/login signup/login/login";
import Sign_in from "../pages/login signup/sign up/sign-up";
import Dashboard from "../pages/dashboard/dashboard";
import Topbar from "../pages/global component/topbar/Topbar";
import Sidemenu from "../pages/global component/sidemenu/Sidemenu";
import Place_Orders from "../pages/place order/place_order_page.jsx";
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
import { updateprofiledata } from "../pages/global component/data_fetching_components/me_endpoint";
import { is_user_session_valid } from "../pages/global component/data_fetching_components/auth";
import Cookies from "js-cookie";
import { result } from "lodash";
import Logoutall from "../pages/login signup/logoutall/logoutall";
// const AppContext = createContext();

const globalcontext = createContext();
export default function App() {
  const [userinfo, setuserinfo] = useState({});
  const [servererror, setservererror] = useState("");
  // const updateddata = updateprofiledata()
  const location = useLocation();
  // this is global context data like media query
  // media query of mui
  const matches = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  async function is_session_valid() {
    let a = await is_user_session_valid();
    if (a.status === 0) {
      navigate("/login");
    }
  }
  const [path, setPath] = useState(false);
  useEffect(
    () => {
      const session_id = Cookies.get("session_id");

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

  return (
    <globalcontext.Provider
      value={{
        matches,
        setuserinfo,
        userinfo,

        servererror,
        setservererror,
        is_session_valid,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {matches && path ? <Sidemenu></Sidemenu> : null}
        <main className="content" style={{ width: "100%", height: "100%" }}>
          {path ? <Topbar></Topbar> : ""}
          <div style={{ margin: "1rem" }}>
            <Routes>
              <Route exact path="/" element={<Dashboard />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Sign_in />}></Route>

              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/place_orders" element={<Place_Orders />}></Route>
              <Route path="/domain" element={<Domain />}></Route>
              <Route path="/customer" element={<Customer />}></Route>
              <Route path="/billing" element={<Billing />}></Route>
              <Route path="/profile" element={<Profile></Profile>} />
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

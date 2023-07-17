import { React } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import Dashboard from "../../pages/dashboard/dashboard";
import PlaceOrders from "../../pages/place order/place_order_page.jsx";
import Domain from "../../pages/Domain/Domain";
import Customer from "../../pages/customer/customer";
import Billing from "../../pages/billing/billing";
import DomainTransferList from "../../pages/tools/DomainTransferlist/Domain_TransferOut_List";
import PendingBulkSummary from "../../pages/tools/pendingsummary/Pendingsummary";
import Actionhistory from "../../pages/tools/ActionHistory/Actionhistory";
import Domainpullrequest from "../../pages/tools/Domainpullrequest/domainpullrequest";
import Reports from "../../pages/tools/reports/reports";
import BulkActionUpload from "../../pages/tools/bulk action upload/bulk action";
import Profile from "../../pages/profile/profile page";
import ChangePassword from "../../pages/reset password/reset";
import OrganizationPage from "../../pages/organization detail/organization page";
import AddFunds from "../../pages/billing/addfund";
import UpdateUser from "../../pages/organization detail/updateUserTab";
import ViewTransaction from "../../pages/billing/ViewTransactionTab copy";
import ViewInvoice from "../../pages/billing/ViewInvoiceTab";

function MainpageControl() {
  const routes = useRoutes([
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/place_orders", element: <PlaceOrders /> },
    { path: "/domain", element: <Domain /> },
    { path: "/customer", element: <Customer /> },
    { path: "/billing", element: <Billing /> },
    { path: "/billing/transcation", element: <ViewTransaction /> },
    { path: "/billing/invoice", element: <ViewInvoice /> },
    { path: "/profile", element: <Profile /> },
    { path: "/addfund", element: <AddFunds /> },
    { path: "/organization", element: <OrganizationPage /> },
    { path: "/org/update", element: <UpdateUser /> },
    { path: "/reset", element: <ChangePassword /> },
    {
      path: "/tools",
      // element: <Tools />, // nested routes
      children: [
        { path: "domain-transferout-list", element: <DomainTransferList /> },
        { path: "pending-bulk-summary", element: <PendingBulkSummary /> },
        { path: "action-history", element: <Actionhistory /> },
        { path: "domain-pull-request", element: <Domainpullrequest /> },
        { path: "reports", element: <Reports /> },
        { path: "bulk-action-file", element: <BulkActionUpload /> },
      ],
    },
  ]);
  return <>{routes}</>;
}

export default MainpageControl;

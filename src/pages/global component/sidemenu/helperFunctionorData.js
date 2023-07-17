const DashboardCustomizeRoundedIcon =
  require("@mui/icons-material/DashboardCustomizeRounded").default;
const LanguageRoundedIcon =
  require("@mui/icons-material/LanguageRounded").default;
const ShoppingCartRoundedIcon =
  require("@mui/icons-material/ShoppingCartRounded").default;
const PersonRoundedIcon = require("@mui/icons-material/PersonRounded").default;
const PaidRoundedIcon = require("@mui/icons-material/PaidRounded").default;
const BuildRoundedIcon = require("@mui/icons-material/BuildRounded").default;
const ArrowRightIcon = require("@mui/icons-material/ArrowRight").default;
const CorporateFareIcon = require("@mui/icons-material/CorporateFare").default;

export const menus = [
  {
    icon: <DashboardCustomizeRoundedIcon></DashboardCustomizeRoundedIcon>,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <CorporateFareIcon></CorporateFareIcon>,
    name: "Organization",
    path: "/organization",
  },

  {
    icon: <ShoppingCartRoundedIcon></ShoppingCartRoundedIcon>,
    name: "Place orders",
    path: "/place_orders",
  },
  {
    icon: <LanguageRoundedIcon></LanguageRoundedIcon>,
    name: "Domain",
    path: "/domain",
  },
  {
    icon: <PersonRoundedIcon></PersonRoundedIcon>,
    name: "Customer",
    path: "/customer",
  },
  {
    icon: <PaidRoundedIcon></PaidRoundedIcon>,
    name: "Billing",
    path: "/billing",
  },
  {
    icon: <BuildRoundedIcon></BuildRoundedIcon>,
    name: "Tools",
    subitems: [
      {
        icon: <ArrowRightIcon></ArrowRightIcon>,
        name: "Action history",
        path: "/tools/action-history",
      },
      {
        icon: <ArrowRightIcon></ArrowRightIcon>,
        name: "Domain Pull Request",
        path: "/tools/domain-pull-request",
      },
      {
        icon: <ArrowRightIcon></ArrowRightIcon>,
        name: "Domain TransferOut List",
        path: "/tools/domain-transferout-list",
      },
      {
        icon: <ArrowRightIcon></ArrowRightIcon>,
        name: "Pending Bulk Summary",
        path: "/tools/pending-bulk-summary",
      },
      {
        icon: <ArrowRightIcon></ArrowRightIcon>,
        name: "Reports",
        path: "tools/reports",
      },
      {
        icon: <ArrowRightIcon></ArrowRightIcon>,
        name: "Bulk Action File Upload",
        path: "tools/bulk-action-file",
      },
    ],
  },
];

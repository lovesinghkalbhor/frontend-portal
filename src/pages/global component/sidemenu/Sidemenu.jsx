import React, { useState, useContext, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";

import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MenuIcon from "@mui/icons-material/Menu";
import { iconcolor } from "../../../components/variable";
import { globalcontext } from "../../../routes/controler";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

export default function Sidemenu() {
  // const iconcolor = "#1F33F2";
  let menus = [
    {
      icon: (
        <DashboardCustomizeRoundedIcon
          style={{ color: iconcolor }}
        ></DashboardCustomizeRoundedIcon>
      ),
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: (
        <CorporateFareIcon style={{ color: iconcolor }}></CorporateFareIcon>
      ),
      name: "Organization",
      path: "/org",
    },

    {
      icon: (
        <ShoppingCartRoundedIcon
          style={{ color: iconcolor }}
        ></ShoppingCartRoundedIcon>
      ),
      name: "Place orders",
      path: "/place_orders",
    },
    {
      icon: (
        <LanguageRoundedIcon style={{ color: iconcolor }}></LanguageRoundedIcon>
      ),
      name: "Domain",
      path: "/domain",
    },
    {
      icon: (
        <PersonRoundedIcon style={{ color: iconcolor }}></PersonRoundedIcon>
      ),
      name: "Customer",
      path: "/customer",
    },
    {
      icon: <PaidRoundedIcon style={{ color: iconcolor }}></PaidRoundedIcon>,
      name: "Billing",
      path: "/billing",
    },
    {
      icon: <BuildRoundedIcon style={{ color: iconcolor }}></BuildRoundedIcon>,
      name: "Tools",
      subitems: [
        {
          icon: <ArrowRightIcon style={{ color: iconcolor }}></ArrowRightIcon>,
          name: "Action history",
          path: "/tools/action-history",
        },
        {
          icon: <ArrowRightIcon style={{ color: iconcolor }}></ArrowRightIcon>,
          name: "Domain Pull Request",
          path: "/tools/domain-pull-request",
        },
        {
          icon: <ArrowRightIcon style={{ color: iconcolor }}></ArrowRightIcon>,
          name: "Domain TransferOut List",
          path: "/tools/domain-transferout-list",
        },
        {
          icon: <ArrowRightIcon style={{ color: iconcolor }}></ArrowRightIcon>,
          name: "Pending Bulk Summary",
          path: "/tools/pending-bulk-summary",
        },
        {
          icon: <ArrowRightIcon style={{ color: iconcolor }}></ArrowRightIcon>,
          name: "Reports",
          path: "tools/reports",
        },
        {
          icon: <ArrowRightIcon style={{ color: iconcolor }}></ArrowRightIcon>,
          name: "Bulk Action File Upload",
          path: "tools/bulk-action-file",
        },
      ],
    },
  ];

  const { is_screen_sm, is_session_valid } = useContext(globalcontext);
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  const [iscollapsed, setiscollapsed] = useState(1);
  // const is_screen_sm = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    is_session_valid();
  });

  return (
    <>
      <Box
        boxShadow="0px 2px 4px rgba(2, 4, 10, 0.1)"
        onMouseEnter={() => {
          toggled();
          setiscollapsed(toggled);
        }}
        onMouseLeave={() => {
          collapseSidebar();
          setiscollapsed(collapsed);
        }}
        backgroundColor="rgb(255, 255, 255, 100%)"
        // paddingTop="rem"
        position="relative"
        // height="100vh"
      >
        <IconButton
          style={{
            margin: is_screen_sm ? "1rem" : "0rem",
            color: iconcolor,
          }}
          onClick={() => {
            collapseSidebar();
            setiscollapsed(collapsed);
            toggleSidebar();
          }}
        >
          <MenuIcon></MenuIcon>
        </IconButton>
        <Sidebar
          display="none !important"
          backgroundColor="rgb(255, 255, 255, 100%)"
          style={{ height: "100vh", paddingTop: "1rem" }}
          breakPoint="md"
        >
          <Menu style={{ display: "flex", alignContent: "space-between" }}>
            <Box>
              {menus.map((element, index) => {
                return (
                  <>
                    {element.subitems?.length ? null : (
                      <Tooltip title={element.name}>
                        <MenuItem
                          style={{
                            borderRadius: "0.5rem",
                          }}
                          key={element.name}
                          icon={element.icon}
                          component={<Link to={element.path} />}
                        >
                          {iscollapsed ? element.name : ""}
                        </MenuItem>
                      </Tooltip>
                    )}
                    {element.subitems?.length ? (
                      <Tooltip title={element.name}>
                        <SubMenu
                          icon={element.icon}
                          label={element.name}
                          key={element.name}
                        >
                          {element.subitems.map((subitem, index) => {
                            return (
                              <MenuItem
                                component={<Link to={subitem.path} />}
                                icon={subitem.icon}
                                key={subitem.name}
                              >
                                {subitem.name}
                              </MenuItem>
                            );
                          })}
                        </SubMenu>
                      </Tooltip>
                    ) : null}
                  </>
                );
              })}
            </Box>
          </Menu>
        </Sidebar>
      </Box>
      {/* </Box> */}
    </>
  );
}

import React, { useState, useContext, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import "./style.css"; // Import your custom styles

import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
  Tooltip,
  Zoom,
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
import {
  iconcolor,
  primarycolor,
  sidemenucolor,
  toprightbordersidemenu,
} from "../../../components/variable";
import { globalcontext } from "../../../routes/controler";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { styled, alpha } from "@mui/material/styles";
// import { useMediaQuery } from "@mui/material";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { transform } from "lodash";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  marginBottom: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "12ch",
    },
  },
}));
export default function Sidemenu() {
  // const iconcolor = "#1F33F2";
  let menus = [
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
  const is_screen_md = useMediaQuery("(min-width:767px)");

  const { is_screen_sm, is_session_valid } = useContext(globalcontext);
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  const [iscollapsed, setiscollapsed] = useState(1);
  // const is_screen_sm = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    is_session_valid();
  }, []);

  return (
    <>
      <Box
        // boxShadow="0px 2px 4px rgba(2, 4, 10, 0.1)"
        // onMouseEnter={() => {
        //   toggled();

        //   setiscollapsed(toggled);
        // }}
        // onMouseLeave={() => {
        //   collapseSidebar();

        //   setiscollapsed(collapsed);
        // }}
        // style={
        //   {
        //     // borderRight: "1px solid white",
        //   }
        // }
        // backgroundColor={primarycolor}
        style={{
          borderTopRightRadius: collapsed ? toprightbordersidemenu : "2rem",
          borderTopLeftRadius: collapsed ? toprightbordersidemenu : "0rem",
        }}
        backgroundColor={is_screen_sm ? primarycolor : "transparent"}
        // backgroundColor="rgb(255, 255, 255, 100%)"
        // paddingTop="rem"
        position="relative"
        marginTop="0.3rem"
        // height="100vh"
        // style={{ borderTopRightRadius: "1rem" }}
      >
        <Box>
          <IconButton
            // <IconButton
            style={{
              margin: is_screen_sm ? "1rem" : "0rem",
              marginLeft: is_screen_sm ? "1.2rem" : "0rem",
              marginRight: "0.3rem",

              color: is_screen_sm ? sidemenucolor : primarycolor,
              // color: sidemenucolor,
            }}
            onClick={() => {
              collapseSidebar();
              setiscollapsed(collapsed);
              toggleSidebar();
            }}
          >
            <MenuIcon></MenuIcon>
            {/* {is_screen_md ? (
            <img
              className="ms-3"
              src="/meta.png"
              alt="METAMONIX Logo"
              style={{
                width: "100px",
                height: "auto",
                display: iscollapsed ? "block" : "none",
                filter: "invert(100%)",
              }}
            />
          ) : null} */}
          </IconButton>
          {is_screen_md ? (
            <img
              // className="ms-1"
              src="/meta.png"
              alt="METAMONIX Logo"
              style={{
                width: "100px",
                height: "auto",
                display: iscollapsed ? "inline-block" : "none",
                filter: "invert(100%)",
              }}
            />
          ) : null}
        </Box>
        {/* <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search> */}
        <Sidebar
          display="none !important"
          backgroundColor={primarycolor}
          // backgroundColor="rgb(255, 255, 255, 100%)"
          style={{
            height: "100vh",
            paddingTop: "1rem",
            borderTop: "1px solid white",
          }}
          breakPoint="md"
          width="200px"
          transitionDuration="0"
        >
          <Menu
            style={
              {
                // display: "flex",
                // alignContent: "space-between",
                // width: "100%",
              }
            }
          >
            <Box>
              {menus.map((element, index) => {
                return (
                  <React.Fragment key={element.name}>
                    {element.subitems?.length ? null : (
                      <Tooltip
                        title={element.name}
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                        PopperProps={{
                          style: {
                            marginRight: "-20rem !important", // Adjust this value to control the distance from the item
                          },
                        }}
                      >
                        <Link
                          className="menu_link"
                          // style={{ textDecoration: "none", color: "white" }}
                          to={element.path}
                        >
                          <MenuItem
                            id="menu_item"
                            style={{
                              // borderRadius: "0.5rem",
                              color: sidemenucolor,
                            }}
                            icon={element.icon}
                            component="div"
                            // component={<Link to={element.path} />}
                          >
                            {iscollapsed ? element.name : ""}
                          </MenuItem>
                        </Link>
                      </Tooltip>
                    )}
                    {element.subitems?.length ? (
                      <Tooltip
                        title={element.name}
                        placement="right"
                        arrow
                        TransitionComponent={Zoom}
                      >
                        <SubMenu
                          id="submenu"
                          icon={element.icon}
                          label={element.name}
                          key={element.name}
                          // backgroundColor="#7C43F2"
                          style={{
                            // backdropFilter: primarycolor,
                            color: sidemenucolor,
                          }}
                        >
                          {element.subitems.map((subitem, index) => {
                            return (
                              <Link
                                key={subitem.name}
                                className="menu_link"
                                to={subitem.path}
                              >
                                <MenuItem
                                  id="sub_menu_item"
                                  component="div"
                                  icon={subitem.icon}
                                >
                                  {subitem.name}
                                </MenuItem>
                              </Link>
                            );
                          })}
                        </SubMenu>
                      </Tooltip>
                    ) : null}
                  </React.Fragment>
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

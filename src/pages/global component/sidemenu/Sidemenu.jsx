import React, { useState, useContext, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import "./style.css"; // Import your custom styles
import { Box, IconButton, useMediaQuery, Tooltip, Zoom } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  primarycolor,
  sidemenucolor,
  toprightbordersidemenu,
} from "../../../components/variable";
import { globalcontext } from "../../../routes/controler";
import { menus } from "./helperFunctionorData";
export default function Sidemenu() {
  const is_screen_md = useMediaQuery("(min-width:767px)");
  const { is_screen_sm, is_session_valid } = useContext(globalcontext);
  const { collapseSidebar, toggleSidebar, collapsed } = useProSidebar();
  const [iscollapsed, setiscollapsed] = useState(1);
  useEffect(() => {
    is_session_valid();
  }, []);

  return (
    <>
      <Box
        style={{
          borderTopRightRadius: collapsed ? toprightbordersidemenu : "2rem",
          borderTopLeftRadius: collapsed ? toprightbordersidemenu : "0rem",
          marginLeft: collapsed ? "0.3rem" : "0rem",
        }}
        backgroundColor={is_screen_sm ? primarycolor : "transparent"}
        position="relative"
        marginTop="0.3rem"
        marginLeft={collapsed ? "0" : "0.3"}
      >
        <Box>
          <IconButton
            style={{
              margin: is_screen_sm ? "1rem" : "0rem",
              marginLeft: is_screen_sm ? "1.2rem" : "0rem",
              marginRight: "0.3rem",

              color: is_screen_sm ? sidemenucolor : primarycolor,
            }}
            onClick={() => {
              collapseSidebar();
              setiscollapsed(collapsed);
              toggleSidebar();
            }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          {is_screen_md ? (
            <img
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

        <Sidebar
          display="none !important"
          backgroundColor={primarycolor}
          style={{
            height: "100vh",
            paddingTop: "1rem",
            borderTop: "1px solid white",
          }}
          breakPoint="md"
          width="200px"
          transitionDuration="0"
        >
          <Menu>
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
                        <Link className="menu_link" to={element.path}>
                          <MenuItem
                            id="menu_item"
                            style={{
                              color: sidemenucolor,
                            }}
                            icon={element.icon}
                            component="div"
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
                          style={{
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
    </>
  );
}

import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { MenuItem, IconButton, Avatar } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Logoutfunction } from "../data_fetching_components/auth";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function TopbarSidemenu() {
  const [state, setState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(true);
  };
  async function logoutfunctionbutton() {
    let a = await Logoutfunction();
    console.log(a, "this is logout funcion");
    if (a.status === 1) {
      navigate("/login");
    }
  }
  async function logoutallfunctionbutton() {
    navigate("/logoutall");
  }
  const arr = [
    <MenuItem onClick={handleClose} component={Link} to="/profile">
      Profile
    </MenuItem>,
    <MenuItem
      onClick={() => {
        navigate("/reset");
      }}
    >
      Reset password
    </MenuItem>,
    <MenuItem onClick={logoutfunctionbutton}>Logout</MenuItem>,
    <MenuItem onClick={logoutallfunctionbutton}>Logout all</MenuItem>,
  ];

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        {arr.map((text, index) => (
          <>
            <ListItem key={text} disablePadding>
              <ListItemButton style={{ paddingTop: "0", paddingBottom: "0" }}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            <Divider
              style={{
                height: "0.5px",
                backgroundColor: "black",
              }}
            />
          </>
        ))}
      </List>
      <Divider />
    </Box>
  );
  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        {" "}
        <IconButton aria-label="expand row" size="small">
          <KeyboardArrowDownIcon />
        </IconButton>
      </Button>
      <Drawer
        anchor={"top"}
        open={state}
        onClose={() => {
          setState(false);
        }}
      >
        {list()}
      </Drawer>
    </>
  );
}

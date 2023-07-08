import { React, useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  styled,
  Badge,
  Avatar,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import Cookies from "js-cookie";

import Spinner from "react-bootstrap/Spinner";

import { useMediaQuery } from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Logout from "@mui/icons-material/Logout";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import TopbarSidemenu from "./topbarsidemenu";
import {
  primarycolor,
  iconbordercolor,
  shadow,
  iconbackgroundcolor,
  topbarcolor,
  topbarpadding,
  borderTop,
  radius,
  margintopbar,
} from "../../../components/variable";
import { globalcontext } from "../../../routes/controler";
import Sidemenu from "../sidemenu/Sidemenu";
import { Me_Endpoint } from "../data_fetching_components/me_endpoint";
import { billing_view_Data } from "../data_fetching_components/billing_endpoints";
import lodash from "lodash";
import { Logoutfunction } from "../data_fetching_components/auth";

// styled componendt is used to modifyi precomponent here we modifying Badge
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const is_screen_md = useMediaQuery("(min-width:767px)");

  let path = location.pathname;
  let showpath = path.split("/").filter((value, index) => value != "tools");
  showpath.join("/").replace(/\//g, "");
  showpath = lodash.startCase(showpath);

  const {
    is_screen_sm,
    userinfo,
    setuserinfo,
    is_session_valid,
    setbillinginfo,
    billinginfo,
  } = useContext(globalcontext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await Me_Endpoint();
        console.log(userData.userinfo);
        const billing_data = await billing_view_Data();

        // You can use the userData variable to access the fetched data and update your component state or perform any other necessary actions
        if (userData.status === 1) {
          setuserinfo(userData.userinfo);
          console.log(
            userData.userinfo.first_name,
            "this is the first name of the user"
          );
        }
        if (billing_data.status === 1) {
          setbillinginfo(billing_data.billing);
        }
      } catch (error) {
        console.log("Failed to fetch data: in top bar");
        // Handle any errors that may occur during the fetch operation
      }
    };

    is_session_valid();
    fetchData();
  }, []);
  console.log(userinfo.first_name, "infor of userlllllllllllllllllllllll");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logoutfunctionbutton() {
    let a = await Logoutfunction();
    console.log(a, "this is logout funcion");
    if (a.status === 1) {
      Cookies.set("session_id", "12");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }
  async function logoutallfunctionbutton() {
    navigate("/logoutall");
  }
  return (
    // main box covers full width
    <Box
      width={"97%"}
      display="flex"
      justifyContent="space-between"
      paddingLeft="1rem"
      alignItems="center"
      boxShadow={shadow}
      color={primarycolor}
      backgroundColor={topbarcolor}
      borderLeft={borderTop}
      borderRight={borderTop}
      borderRadius={radius}
      marginLeft={margintopbar}
      marginRight={margintopbar}
      marginTop="0.4rem"
    >
      {/* show spinner if the data is not fetched yet */}
      {is_screen_sm ? (
        <Box
          component="h5"
          margin="1rem"
          // color={iconcolor}
          style={{ opacity: 0.7 }}
        >
          {userinfo?.first_name ? (
            showpath
          ) : (
            <Spinner
              as="span"
              animation="border"
              size="md"
              role="status"
              aria-hidden="true"
            />
          )}
        </Box>
      ) : (
        <Sidemenu></Sidemenu>
      )}
      {/* inner box for icons end */}
      {/* if screen width if lg then only show this box else show below box commented by  "small size" */}
      {is_screen_sm ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="30rem"
          padding={topbarpadding}
          paddingRight="1rem"
        >
          {/* boxes accets like html tags  */}
          <Box component="h6" margin="0rem" style={{ opacity: 0.7 }}>
            Available Fund
          </Box>
          {/* boxes accets like html tags  */}

          <Box
            component="h6"
            margin="0rem"
            padding="0.3rem"
            paddingLeft="1rem"
            paddingRight="1rem"
            borderRadius="1rem"
            color={primarycolor}
            border={`1px solid ${iconbordercolor}`}
          >
            {billinginfo.currency_symbol} {billinginfo.currentStanding}
          </Box>

          {/* icons */}
          <Tooltip title="Add money">
            {/* <IconButton */}
            <Button
              style={{
                cursor: "pointer",
                backgroundColor: primarycolor,

                borderRadius: "1rem",
                paddingLeft: "10px",
                paddingRight: "10px",
                color: "white",
              }}
              onClick={() => navigate("/addfund")}
            >
              <Typography
                component="span"
                fontSize="small"
                paddingTop="0"
                marginTop="0"
              >
                Add fund
              </Typography>
            </Button>
          </Tooltip>

          {/* badge display notification on top */}
          <Box backgroundColor={iconbackgroundcolor} borderRadius="4rem">
            <IconButton
              style={{
                padding: "0.5rem",
                color: primarycolor,
                border: `1px solid ${iconbordercolor}`,
              }}
            >
              <Badge badgeContent={4} color="primary">
                <NotificationsIcon fontSize="small"></NotificationsIcon>
              </Badge>
            </IconButton>
          </Box>

          {/* avtar icon mrom mui components */}
          <Tooltip title="Account holder">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                borderRadius: "1.1rem",
                cursor: "pointer",
              }}
              border={`1px solid ${iconbordercolor}`}
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <IconButton size="small">
                <Stack direction="row" spacing={2}>
                  {/* costum badge define above */}
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    {/* avtar display photo if available else display alt names */}
                    <Avatar alt="H Sharp" sx={{ width: 26, height: 26 }} />
                  </StyledBadge>
                </Stack>
              </IconButton>
              <Box color={primarycolor} component="h6" margin="0">
                {userinfo.first_name}
              </Box>
            </Box>
          </Tooltip>
        </Box>
      ) : (
        // small size////////////////////////////////////////////////
        <>
          <Box component="h5" style={{ opacity: 0.7 }}>
            {showpath}
          </Box>

          <TopbarSidemenu></TopbarSidemenu>
        </>
      )}

      {/* this is menuitems after clicking on the user button  */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            border: `1px solid ${primarycolor}`,
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">
          <Avatar /> Profile
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            navigate("/reset");
          }}
        >
          <ListItemIcon>
            <LockRoundedIcon fontSize="small" />
          </ListItemIcon>
          Reset password
        </MenuItem>

        <MenuItem onClick={logoutfunctionbutton}>
          <ListItemIcon>
            <IconButton>
              <Logout fontSize="small" />
            </IconButton>
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem onClick={logoutallfunctionbutton}>
          <ListItemIcon>
            <IconButton>
              <Logout fontSize="small" />
            </IconButton>
          </ListItemIcon>
          Log out of all sessions
        </MenuItem>
      </Menu>
    </Box>
  );
}

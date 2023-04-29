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
  Button,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logout from "@mui/icons-material/Logout";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import TopbarSidemenu from "./topbarsidemenu";
import {
  primarycolor,
  shadow,
  iconbackgroundcolor,
  iconcolor,
} from "../../../components/variable";
import { globalcontext } from "../../../routes/controler";
import Sidemenu from "../sidemenu/Sidemenu";
import { Me_Endpoint } from "../data_fetching_components/me_endpoint";
import lodash from "lodash";
import {
  Logoutfunction,
  Logoutallfunction,
} from "../data_fetching_components/auth";

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

  let path = location.pathname;
  let showpath = path.split("/").filter((value, index) => value != "tools");
  showpath.join("/").replace(/\//g, "");
  // let showpathUpperCase = lodash.capitalize(showpath);
  showpath = lodash.startCase(showpath);

  const { matches, userinfo, setuserinfo, is_session_valid } =
    useContext(globalcontext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await Me_Endpoint();
        console.log(userData.userinfo);

        // You can use the userData variable to access the fetched data and update your component state or perform any other necessary actions
        if (userData.status === 1) {
          setuserinfo(userData.userinfo);
        }
        // console.log(userData.users[0], "inthe topbar");
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
  // const matches = useContext(globalcontext);
  // const [ismediumscreen, setismediumscreen] = useState(0);
  // setismediumscreen(matches);

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
      navigate("/login");
    }
  }
  async function logoutallfunctionbutton() {
    navigate("/logoutall");
  }
  return (
    // main box covers full width
    <Box
      width={"100%"}
      display="flex"
      justifyContent="space-between"
      paddingLeft="1rem"
      alignItems="center"
      backgroundColor="#FFFFFF"
      boxShadow={shadow}
    >
      {matches ? (
        <Box
          component="h5"
          margin="1rem"
          // color={iconcolor}
          style={{ opacity: 0.7 }}
        >
          {showpath}
        </Box>
      ) : (
        <Sidemenu></Sidemenu>
      )}
      {/* inner box for icons end */}
      {matches ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="30rem"
          padding="1rem"
        >
          {/* boxes accets like html tags  */}
          <Box component="h6" margin="0rem" style={{ opacity: 0.7 }}>
            Available Fund
          </Box>
          {/* boxes accets like html tags  */}

          <Box
            component="h6"
            margin="0rem"
            backgroundColor={iconbackgroundcolor}
            padding="0.5rem"
            paddingLeft="1rem"
            paddingRight="1rem"
            borderRadius="1.5rem"
          >
            &#8377; 22
          </Box>

          {/* icons */}
          <Tooltip title="Add money">
            <IconButton
              style={{
                // margin: "1rem",
                padding: "0.5rem",
                backgroundColor: primarycolor,
                color: "white",
              }}
            >
              <CurrencyRupeeIcon
                fontSize="small"
                // margin="1rem"
              ></CurrencyRupeeIcon>
            </IconButton>
          </Tooltip>

          {/* badge display notification on top */}
          <Box backgroundColor={iconbackgroundcolor} borderRadius="4rem">
            <IconButton
              style={{
                // margin: "1rem",
                padding: "0.5rem",
                color: primarycolor,
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
                backgroundColor: iconbackgroundcolor,
                padding: "0.2rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
                borderRadius: "2rem",
                cursor: "pointer",
              }}
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
                    <Avatar
                      alt="H Sharp"
                      sx={{ width: 26, height: 26 }}
                      // src="/static/images/avatar/1.jpg"
                    />
                  </StyledBadge>
                </Stack>
              </IconButton>
              <Box component="h6" margin="0">
                {userinfo.first_name}
              </Box>
            </Box>
          </Tooltip>
        </Box>
      ) : (
        <>
          <Box
            component="h5"
            // margin="1rem"
            // color={iconcolor}
            style={{ opacity: 0.7 }}
          >
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LockRoundedIcon fontSize="small" />
          </ListItemIcon>
          Locked Fund : 45234
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
          Logout all
        </MenuItem>
      </Menu>
    </Box>
  );
}

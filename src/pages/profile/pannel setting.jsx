import React, { useContext, useEffect } from "react";
import {
  Avatar,
  Stack,
  Box,
  Divider,
  Button,
  TextField,
  Switch,
} from "@mui/material";
import { primarycolor } from "../../components/variable";
import { globalcontext } from "../../routes/controler";
export default function Pannel_Setting(props) {
  const { is_session_valid } = useContext(globalcontext);

  useEffect(() => {
    is_session_valid();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      // padding="0"
      maxWidth={props.screenSize ? "80%" : "100%"}
    >
      <Box margin="2rem">
        <Box display="flex">
          {" "}
          <h4>Theaf protection</h4> <Switch color="secondary"></Switch>
        </Box>
        <Box>
          If you want your newly Registered domains to have Theft protection
          enabled automatically, then you can enable it from here by turning it
          On.
        </Box>{" "}
      </Box>
      <Box margin="2rem">
        <Box display="flex">
          {" "}
          <h4>Privacy Protection</h4> <Switch color="secondary"></Switch>
        </Box>
        <Box>
          If you want your newly Registered domains to have Theft protection
          enabled automatically, then you can enable it from here by turning it
          On.
        </Box>{" "}
      </Box>
      <Box margin="2rem">
        <Box display="flex">
          {" "}
          <h4>Customer Emails</h4> <Switch color="secondary"></Switch>
        </Box>
        <Box>
          If you want your newly Registered domains to have Theft protection
          enabled automatically, then you can enable it from here by turning it
          On.
        </Box>{" "}
      </Box>
      <Button
        variant="contained"
        style={{
          padding: "0.5rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          color: "white",
          backgroundColor: primarycolor,
          marginBottom: "1rem",
          borderRadius: "0.5rem",
          margin: "2.5rem",
          marginLeft: "1rem",
          width: "10rem",
        }}
      >
        Update
      </Button>{" "}
    </Box>
  );
}

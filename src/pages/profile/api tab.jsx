import React from "react";
import {
  Avatar,
  Stack,
  Box,
  Divider,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { primarycolor } from "../../components/variable";

export default function Api_Tab(props) {
  return (
    <Box padding="2rem" width={props.screenSize ? "90%" : "100%"}>
      <Box>
        <h5>Api Key</h5>
        <p>Use the API key below to make calls to our system.</p>
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
            // margin: "2rem",
            marginLeft: "1rem",
          }}
        >
          View api Key
        </Button>{" "}
      </Box>
      <Divider
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        backgroundColor="black"
        color="black"
      ></Divider>
      <Box>
        <h5>Brand Id</h5>
        <p>Use the Brand Id below to make calls to our system.</p>
        434
      </Box>
      <Divider
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        backgroundColor="black"
        color="black"
      ></Divider>
      <Box>
        <h5>Whitelist your IP Addresses</h5>
        <p>
          Before you can make API calls to our system, you must whitelist the IP
          addresses from where your calls will be made. Note: IP ranges and
          netblocks are not accepted.
        </p>
        <Grid container spacing={2}>
          <Grid item sm={12} md={4}>
            <TextField
              id="name-input"
              label="Name"
              variant="outlined"
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <TextField
              id="name-input"
              label="Name"
              variant="outlined"
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <TextField
              id="name-input"
              label="Name"
              variant="outlined"
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <TextField
              id="name-input"
              label="Name"
              variant="outlined"
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <TextField
              id="name-input"
              label="Name"
              variant="outlined"
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          style={{
            padding: "0.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            color: "white",
            backgroundColor: primarycolor,
            marginBottom: "1rem",
            marginTop: "1rem",
            borderRadius: "0.5rem",
            // margin: "2rem",
            marginLeft: "1rem",
          }}
        >
          Save White Listed IP Address
        </Button>{" "}
      </Box>
      <Divider backgroundColor="black" color="black"></Divider>
    </Box>
  );
}

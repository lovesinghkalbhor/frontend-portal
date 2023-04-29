import React from "react";
import {
  Avatar,
  Stack,
  Box,
  Divider,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

export default function Domain_Pricing_Tab() {
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

  return (
    <Box>
      <Box component="h4" margin="2rem">
        Search Tid
      </Box>
      <TextField
        id="outlined-select-currency"
        select
        label="Search"
        defaultValue="EUR"
        helperText="Please select your currency"
        style={{ margin: "2rem" }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

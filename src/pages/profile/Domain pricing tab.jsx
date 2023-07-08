import React, { useContext, useEffect } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { globalcontext } from "../../routes/controler";

export default function Domain_Pricing_Tab() {
  const { is_session_valid } = useContext(globalcontext);

  useEffect(() => {
    is_session_valid();
  }, []);
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

  useEffect(() => {
    is_session_valid();
  }, []);
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

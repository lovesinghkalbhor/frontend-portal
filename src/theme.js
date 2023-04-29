import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

export const token = (mode) => {
  return {
    ...(mode === "dark"
      ? {
          lightblue: {
            100: "#d7f6fe",
            200: "#aeedfd",
            300: "#86e3fb",
            400: "#5ddafa",
            500: "#35d1f9",
            600: "#2aa7c7",
            700: "#207d95",
            800: "#155464",
            900: "#0b2a32",
          },
          darkblue: {
            100: "#ccd2e9",
            200: "#9aa5d3",
            300: "#6779bc",
            400: "#354ca6",
            500: "#021f90",
            600: "#021973",
            700: "#011356",
            800: "#010c3a",
            900: "#00061d",
          },
          orange: {
            100: "#ffddd6",
            200: "#ffbcad",
            300: "#ff9a85",
            400: "#ff795c",
            500: "#ff5733",
            600: "#cc4629",
            700: "#99341f",
            800: "#662314",
            900: "#33110a",
          },
        }
      : {
          lightblue: {
            900: "#0b2a32",
            800: "#155464",
            700: "#207d95",
            600: "#2aa7c7",
            500: "#35d1f9",
            400: "#5ddafa",
            300: "#86e3fb",
            200: "#aeedfd",
            100: "#d7f6fe",
          },
          darkblue: {
            900: "#00061d",
            800: "#010c3a",
            700: "#011356",
            600: "#021973",
            500: "#021f90",
            400: "#354ca6",
            300: "#6779bc",
            200: "#9aa5d3",
            100: "#ccd2e9",
          },
          orange: {
            900: "#33110a",
            800: "#662314",
            700: "#99341f",
            600: "#cc4629",
            500: "#ff5733",
            400: "#ff795c",
            300: "#ff9a85",
            200: "#ffbcad",
            100: "#ffddd6",
          },
        }),
  };
};

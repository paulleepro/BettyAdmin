import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0B7CE5",
    },
    action: {
      active: "#9a9a9a",
    },
  },
  typography: {
    fontFamily: [
      "Infra",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ].join(", "),
    body1: {
      fontSize: "0.9375rem",
      lineHeight: "1.25rem",
    },
  },
});

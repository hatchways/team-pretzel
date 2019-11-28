import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"'
  },
  primary: "#f04040",
  secondary: "#1f1f1f",
  error: "#d8000c",
  bgcolor: "#f6f6f6",

  overrides: {
    MuiCardMedia: {
      media: {
        objectFit: "contain"
      }
    },
    MuiGridList: {
      root: {
        "&::-webkit-scrollbar": {
          width: "0.1rem",
          height: "0.5rem"
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          height: "0.5rem"
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          borderRadius: "10px",
          height: "10px",
          width: "3px"
        },
        "&::-webkit-scrollbar-button": {
          width: "0.3rem"
        }
      }
    }
  }
});

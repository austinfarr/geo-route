import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      contrastText: "#ffffff", // Text color against primary main color (optional)
    },
    secondary: {
      main: "#c00c0d",
      contrastText: "#ffffff", // Text color against secondary main color (optional)
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Optional: if you want to remove uppercase transformation for buttons
        },
      },
    },
    // ... other component overrides
  },
});

export default theme;

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    darkMode?: boolean;
  }
  interface ThemeOptions {
    darkMode?: boolean;
  }
}

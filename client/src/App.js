import React from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { theme } from "./themes/theme";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Route exact path={["/signin", "/signup"]} component={AuthPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

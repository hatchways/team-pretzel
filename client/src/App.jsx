import React from "react";
import axios from "axios";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

const setAuthToken = token => {
  if (token) {
    // apply to every req
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

const App = () => {
  if (localStorage) {
    const token = localStorage.getItem("jwtToken");
    setAuthToken(token);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        {/*    <Route exact path="/">
          <Redirect to="/signin" />
        </Route> */}
        <Route exact path={["/signin", "/signup"]} component={AuthPage} />
        <Route exact path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

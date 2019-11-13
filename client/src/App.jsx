import React, { useState, useEffect } from "react";
import axios from "axios";

import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard/index";

const setAuthToken = token => {
  if (token) {
    // apply to every req
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage) {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        setAuthToken(token);
        setLoggedIn(true);
      }
    }
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/signin" />}
        </Route>
        <Route exact path={["/signin", "/signup"]} component={AuthPage} />
        <Route exact path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

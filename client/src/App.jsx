import React, { useState, useEffect } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { theme } from "./themes/theme";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import VotePage from "./pages/container/VotePage";
import { setAuthToken } from "./utils/helpers";
import jwt_decode from "jwt-decode";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // check if jwt in localstorage
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      // current time
      const currentTime = Date.now() / 1000;
      // compare current time and token exp
      // if exp time > current time - sign in
      if (currentTime < decoded.exp) {
        setAuthToken(localStorage.jwtToken);
        setLoggedIn(true);
      } else {
        // remove token from lstorage
        localStorage.removeItem("jwtToken");
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
        <Route path="/votepage" component={VotePage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

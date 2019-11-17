import axios from "axios";

export const JWTtoLocalStorage = jwtToken => {
  if (!window.localStorage) {
    return new Error("Local storage unavailable");
  } else {
    localStorage.setItem("jwtToken", jwtToken);
  }
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

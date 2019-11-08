export const JWTtoLocalStorage = jwtToken => {
  if (!window.localStorage) {
    return new Error("Local storage unavailable");
  } else {
    localStorage.setItem("jwtToken", jwtToken);
  }
};

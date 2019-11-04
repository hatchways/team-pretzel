import jwt from "jsonwebtoken";

const jwtSignToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

export default jwtSignToken;

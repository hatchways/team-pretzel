import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import DATABASE from "./database.js";
import indexRouter from "./routes/index";
import pingRouter from "./routes/ping";
import userRouter from "./routes/userRouter";
import pollRouter from "./routes/pollRouter";
import friendListRouter from "./routes/friendListRouter";
import friendsRouter from "./routes/friendsRouter";
import imageRouter from "./routes/imageRouter";
import voteRouter from "./routes/voteRouter";

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/polls", pollRouter);
app.use("/api/v1/friend-lists", friendListRouter);
app.use("/api/v1/friends", friendsRouter);
app.use("/api/v1/images", imageRouter);
app.use("/api/v1/vote", voteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  req.app.get("env") === "development"
    ? res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
      })
    : res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
});

module.exports = app;

#!/usr/bin/env node

/* Sets up the environment variables from your .env file*/
require("dotenv").config();

/**
 * Module dependencies.
 */

var app = require("../app");
var http = require("http");
var socket = require("socket.io");

/**
 * App utils.
 */
import { setOnlineStatus, setOfflineStatus } from "../utils/setStatus";

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

const io = socket(server);
io.on("connection", socket => {
  console.log("⚡ A socket successfully connected at", socket.id);

  socket.on("user_online", user => {
    console.log(`🙂 ${user.name} is online`);
    setOnlineStatus(user.id);
    io.sockets.emit("user_online", user);
  });

  socket.on("user_offline", user => {
    console.log(`😶 ${user.name} is offline`);
    setOfflineStatus(user.id);
    io.sockets.emit("user_offline", user);
  });

  socket.on("disconnect", () => {
    console.log("⭕ Socket disconnected");
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  console.log("Listening on " + bind);
}

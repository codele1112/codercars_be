const { sendResponse, AppError } = require("./helpers/utils.js");
require("dotenv").config();
const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");

var app = express();
// log requests
var logger = require("morgan");
app.use(logger("dev"));

app.use(express.json());

// parse request to body-parser
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// load assets
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

/* DB connection*/
const db = require("./config/db");
db.connect();

app.use("/", indexRouter);

// catch 404 and forard to error handler
app.use((req, res, next) => {
  const err = new AppError(404, "Not Found", "Bad Request");
  next(err);
});

/* Initialize Error Handling */
app.use((err, req, res, next) => {
  console.log("ERROR", err);
  return sendResponse(
    res,
    err.statusCode ? err.statusCode : 500,
    false,
    null,
    { message: err.message },
    err.isOperational ? err.errorType : "Internal Server Error"
  );
});

module.exports = app;

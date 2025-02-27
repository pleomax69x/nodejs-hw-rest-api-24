const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const boolParser = require("express-query-boolean");
const helmet = require("helmet");
const limiter = require("./helpers/limiter");

const contactsRouter = require("./routes/api/contacts/contacts");
const userRouter = require("./routes/api/users/user-routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());

require("dotenv").config;
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
app.use("/avatars", express.static(path.join(__dirname, AVATARS_OF_USERS)));
// app.use(express.static(path.join(__dirname, AVATARS_OF_USERS)));

console.log(__dirname);

app.use(limiter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 15000 }));
app.use(boolParser());

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  const code = err.status || 500;
  const status = err.status ? "error" : "fail";
  res.status(code).json({ status, code, message: err.message });
});

module.exports = app;

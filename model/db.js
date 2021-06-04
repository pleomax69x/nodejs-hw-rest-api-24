const mongoose = require("mongoose");

require("dotenv").config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  poolSize: 5,
});

mongoose.connection.on("connected", () => {
  console.log("Mongose: Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.on("disconected", () => {
  console.log("Mongoose disconected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconect MongoDB");
    process.exit();
  });
});

module.exports = db;

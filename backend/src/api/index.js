const express = require("express");
const api = express.Router();
const account = require("./account");

api.get("/test", (req, res) => {
  res.send("Test");
});

api.use("/account", account);

module.exports = api;

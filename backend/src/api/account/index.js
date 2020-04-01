const express = require("express");
const account = express.Router();
const accountCtrl = require("./account.ctrl");

account.post("/register/local", accountCtrl.localRegister);
account.post("/login/local", accountCtrl.localLogin);
account.post("/logout", accountCtrl.logout);

module.exports = account;

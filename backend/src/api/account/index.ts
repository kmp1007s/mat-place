import * as express from "express";
const account = express.Router();
import * as accountCtrl from "./account.ctrl";

account.post("/register/local", accountCtrl.localRegister);
account.post("/login/local", accountCtrl.localLogin);
account.post("/logout", accountCtrl.logout);

export default account;

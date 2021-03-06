import { Router } from "express";
import * as authCtrl from "./auth.ctrl";

const auth = Router();

auth.post("/register", authCtrl.localRegister);
auth.post("/login/local", authCtrl.localLogin);
auth.post("/logout", authCtrl.logout);
auth.post("/check", authCtrl.tokenCheck);

export default auth;

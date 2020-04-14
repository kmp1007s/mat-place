import { Router } from "express";
import * as profileCtrl from "./profile.ctrl";

const profile = Router();
profile.get("/:userId", profileCtrl.getProfile);
profile.patch("/:userId", profileCtrl.updateProfile);

export default profile;

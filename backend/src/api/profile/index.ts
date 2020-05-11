import { Router } from "express";
import multer = require("multer");
import path = require("path");
import * as profileCtrl from "./profile.ctrl";
import loginCheck from "lib/auth/login";

const storage = multer.diskStorage({
  destination: "public/profile/img/",
  filename: function (req, file, cb) {
    cb(null, "imgFile" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const profile = Router();

profile.get("/:userId", profileCtrl.readProfile);
profile.patch("/:userId", loginCheck, profileCtrl.updateProfile);
profile.post(
  "/:userId/image",
  loginCheck,
  upload.single("img"),
  profileCtrl.updateProfileImage
);

export default profile;

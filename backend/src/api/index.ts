import * as express from "express";
import auth from "./auth";
import profile from "./profile";

const api = express.Router();
api.use("/auth", auth);
api.use("/profile", profile);

export default api;

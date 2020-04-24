import * as express from "express";
import auth from "./auth";
import profile from "./profile";
import place from "./place";

const api = express.Router();
api.use("/auth", auth);
api.use("/profile", profile);
api.use("/place-lists", place);

export default api;

import * as express from "express";
import auth from "./auth";
import profile from "./profile";
import place from "./place";
import review from "./review";

const api = express.Router();
api.use("/auth", auth);
api.use("/profiles", profile);
api.use("/place-lists", place);
api.use("/reviews", review);

export default api;

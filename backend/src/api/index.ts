import * as express from "express";
const api = express.Router();
import account from "./account";

api.get("/test", (req, res) => {
  res.send("Test");
});

api.use("/account", account);

export default api;

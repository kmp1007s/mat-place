import * as express from "express";
import auth from "./auth";
import profile from "./profile";
import place from "./place";
import review from "./review";

const api = express.Router();

const logRoutingSucceed = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  "Route Successfully Handled".log("success");
};

api.use("/auth", auth);
api.use("/profiles", profile);
api.use("/place-lists", place);
api.use("/reviews", review);

api.use(logRoutingSucceed);

export default api;

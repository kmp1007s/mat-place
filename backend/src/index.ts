import "dotenv/config";

import mongoose = require("mongoose");
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import cors = require("cors");

import api from "./api";
import { logRoutesInfo } from "./lib/log";
import { handleErrors, extendResponse as addErrorRespond } from "./lib/error";
import { validateToken } from "./lib/auth/jwt";

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const app = express();

mongoose.Promise = global.Promise; // Node Promise
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((e) => console.error(e));

app
  .use(cors())
  .use(express.static("public"))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(logRoutesInfo)
  .use(cookieParser(COOKIE_SECRET))
  .use(addErrorRespond)
  .use(validateToken)
  .use("/api", api)
  .use(handleErrors);

app.listen(PORT, () => {
  `Server is Listening on ${PORT}`.log();
});

import "dotenv/config";

import * as express from "express"; // module.exports로 exports된 경우 이렇게 불러옴 == import express = require("express");
const app = express();

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

import api from "./api";
import { logRoutesInfoMiddleWare } from "./lib/log";
import { errorMiddleWare } from "./lib/error";
import { jwtMiddleWare } from "./lib/jwt";

import mongoose = require("mongoose");
mongoose.Promise = global.Promise; // Node Promise
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Connected");
  })
  .catch((e) => console.error(e));

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(logRoutesInfoMiddleWare)
  .use(cookieParser(COOKIE_SECRET))
  .use(jwtMiddleWare)
  .use("/api", api)
  .use(errorMiddleWare);

app.listen(PORT, () => {
  `Server is Listening on ${PORT}`.console("info");
});

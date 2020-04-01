require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

const api = require("./api");
const { logRoutesInfoMiddleWare } = require("./lib/log");
const { errorMiddleWare } = require("./lib/error");
const { jwtMiddleWare } = require("./lib/jwt");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise; // Node Promise
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(response => {
    console.log("MongoDB Connected");
  })
  .catch(e => console.error(e));

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(logRoutesInfoMiddleWare)
  .use(cookieParser(COOKIE_SECRET))
  .use(jwtMiddleWare)
  .use("/api", api)
  .use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});

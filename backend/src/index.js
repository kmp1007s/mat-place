require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const api = require("./api");
const logLib = require("./lib/log");

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
  .use(logLib.logRoutesInfoMiddleWare)
  .use("/api", api);

app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});

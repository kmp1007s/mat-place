const accountModel = require("model/account");
const { promiseWrapper, makeErrResponse } = require("lib/error");
const { logInfo, logError } = require("lib/log");
const { makeSignedCookie } = require("lib/cookie");

const RespondToken = (token, res) => {
  res.cookie(...makeSignedCookie("access_token", token));
  res.json({ access_token: token });
};

exports.localRegister = promiseWrapper(async (req, res) => {
  let account = null;

  account = await accountModel.findByUserId(req.body.userId);

  // Conflict
  if (account) {
    const errMessage = "UserID Exists";

    logError(errMessage);
    return res.status(409).json(makeErrResponse(errMessage));
  }

  account = await accountModel.localRegister(req.body);

  const token = await account.generateToken();
  RespondToken(token, res);

  logInfo("Register Success");
});

exports.localLogin = promiseWrapper(async (req, res) => {
  let account = null;

  account = await accountModel.findByUserId(req.body.userId);

  if (!account) {
    const errMessage = "No User";

    logError(errMessage);
    return req.status(403).json(makeErrResponse(errMessage));
  }

  const token = await account.generateToken();
  RespondToken(token, res);

  logInfo("Login Success");
});

exports.logout = promiseWrapper(async (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");

  logInfo("Logout Success");
});

const accountModel = require("model/account");

exports.localRegister = async (req, res) => {
  let account = null;

  try {
    account = await accountModel.findByUserId(req.body.userId);

    // Conflict
    if (account) {
      console.log("UserID Exists");
      return res.status(409).json({ error: "UserID Exists" });
    }

    account = await accountModel.localRegister(req.body);
    res.send(account.userId);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.toString() });
  }
};

exports.localLogin = (req, res) => {
  res.send("Login Local");
};

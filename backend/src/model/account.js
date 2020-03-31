const mongoose = require("mongoose");
const { Schema } = mongoose;

const Account = new Schema({
  userId: String,
  pwd: String,
  userName: String,
  createdAt: { type: Date, default: Date.now }

  /* TODO: SNS 계정 연동, 프로필 사진 */
});

/**
 * 로컬 계정 회원가입
 */
Account.statics.localRegister = function({ userId, pwd, userName }) {
  const account = new this({
    userId,
    pwd,
    userName
  });

  return account.save();
};

/**
 * UserID로 DB에서 계정을 찾음
 */
Account.statics.findByUserId = function(userId) {
  return this.findOne({ userId }).exec();
};

module.exports = mongoose.model("Account", Account);

import { Schema } from "mongoose";
import bcrypt = require("bcrypt");
import { generate as generateToken } from "lib/auth/jwt";

// ODM을 위한 스키마 정의
const AccountSchema: Schema = new Schema({
  userId: String,
  hashedPassword: String,
  profile: {
    userName: String,
    image: { type: String, default: "profile/img/default_profile.png" },
  },
  createdAt: { type: Date, default: Date.now },

  /* TODO: SNS 계정 연동, 프로필 사진 */
});

/**
 * 로컬 계정 회원가입
 */
AccountSchema.statics.localRegister = async function ({
  userId,
  password,
  userName,
}) {
  const account = await new this({ userId, profile: { userName } });
  await account.setPassword(password);
  return account.save();
};

/**
 * UserID로 DB에서 계정을 찾음
 */
AccountSchema.statics.getAccountByUserId = function (userId) {
  return this.findOne({ userId });
};

AccountSchema.statics.updateAccountByUserId = async function (
  userId,
  toUpdate
) {
  let password = null;

  if (toUpdate.userName) delete toUpdate.userName;
  if (toUpdate.password) {
    password = toUpdate.password;
    delete toUpdate.password;
  }

  const updated = await this.findOneAndUpdate({ userId }, toUpdate, {
    new: true,
  });

  if (password) {
    await updated.setPassword(password);
    return updated.save();
  } else return updated;
};

/**
 * 토큰 생성
 */
AccountSchema.methods.generateToken = function () {
  const payload = {
    _id: this._id,
    userId: this.userId,
  };

  return generateToken(payload);
};

AccountSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

AccountSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.hashedPassword);
};

AccountSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

export default AccountSchema;

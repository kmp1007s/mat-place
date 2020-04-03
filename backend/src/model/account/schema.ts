import { Schema } from "mongoose";
import { generateToken } from "lib/jwt";
import IAccountDocument from "./document";

// schema 정의
const AccountSchema: Schema = new Schema({
  userId: String,
  pwd: String,
  userName: String,
  createdAt: { type: Date, default: Date.now }

  /* TODO: SNS 계정 연동, 프로필 사진 */
});

/**
 * 로컬 계정 회원가입
 */
AccountSchema.statics.localRegister = function({
  userId,
  pwd,
  userName
}: any): Promise<IAccountDocument> {
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
AccountSchema.statics.findByUserId = function(
  userId: string
): Promise<IAccountDocument> {
  return this.findOne({ userId }).exec();
};

/**
 * 토큰 생성
 */
AccountSchema.methods.generateToken = function(): Promise<any> {
  const payload = {
    _id: this._id
  };

  return generateToken(payload);
};

export default AccountSchema;

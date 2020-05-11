import { Model, model } from "mongoose";
import AccountSchema from "./schema";
import AccountDocument from "./document";

// TS를 위한 model 타입 정의
interface AccountModel extends Model<AccountDocument> {
  // model methods (static methods)
  localRegister(accountData: {
    userId: string;
    pwd: string;
    userName: string;
  }): Promise<AccountDocument>;
  getAccountByUserId(userId: string): Promise<AccountDocument>;
  updateAccountByUserId(
    userId: string,
    toUpdate: {
      userId?: string;
      password?: string;
      profile?: {
        userName?: string;
        image?: string;
      };
    }
  ): Promise<AccountDocument>;
}

const Account: AccountModel = model<AccountDocument, AccountModel>(
  "Account",
  AccountSchema
);
export default Account;

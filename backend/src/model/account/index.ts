import { Model, model } from "mongoose";
import AccountSchema from "./schema";
import AccountDocument from "./document";

// model type 정의
interface AccountModel extends Model<AccountDocument> {
  // model methods (static methods)
  findByUserId(userId: string): Promise<AccountDocument>;
  findByUserIdAndUpdate(
    userId: string,
    update: object
  ): Promise<AccountDocument>;
  localRegister(accountData: any): Promise<AccountDocument>;
}

const Account: AccountModel = model<AccountDocument, AccountModel>(
  "Account",
  AccountSchema
);
export default Account;

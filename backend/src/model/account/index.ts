import { Model, model } from "mongoose";
import AccountSchema from "./schema";
import IAccountDocument from "./document";

// model type 정의
interface IAccountModel extends Model<IAccountDocument> {
  // model methods (static methods)
  findByUserId(userId: string): Promise<IAccountDocument>;
  localRegister(searchObject: any): Promise<IAccountDocument>;
}

const Account: IAccountModel = model<IAccountDocument, IAccountModel>(
  "Account",
  AccountSchema
);
export default Account;

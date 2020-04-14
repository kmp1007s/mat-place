import { Document } from "mongoose";

// document type정의
interface AccountDocument extends Document {
  // properties
  userId: string;
  pwd: string;
  userName: string;
  createdAt: Date;

  // instance methods (methods)
  generateToken(): Promise<string>;
}

export default AccountDocument;

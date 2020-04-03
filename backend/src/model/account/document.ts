import { Document } from "mongoose";

// document type정의
interface IAccountDocument extends Document {
  // properties
  userId: string;
  pwd: string;
  userName: string;
  createdAt: Date;

  // instance methods (methods)
  generateToken(): Promise<any>;
}

export default IAccountDocument;

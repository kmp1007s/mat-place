import { Document } from "mongoose";

// TS를 위한 document 타입 정의
export default interface AccountDocument extends Document {
  userId: string; // properties
  hashedPassword: string;
  profile: {
    userName: string;
    image: string;
  };
  createdAt: Date;

  generateToken(): string; // instance methods (methods)
  setPassword(password: string): Promise<void>;
  validatePassword(password: string): Promise<boolean>;
  serialize(): object;
}

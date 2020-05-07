import { Document } from "mongoose";

export default interface ReviewDocument extends Document {
  userId: string;
  title: string;
  content: string;
  placeId: string;
  rates: number;
  createdAt: Date;
}

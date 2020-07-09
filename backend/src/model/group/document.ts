import { Document, Types } from "mongoose";

export default interface GroupDocument extends Document {
  userId: string;
  name: string;
  placeListIds: Array<Types.ObjectId>;
  createdAt: Date;
}

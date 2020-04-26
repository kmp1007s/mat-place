import { Document, Types } from "mongoose";

export default interface GroupDocument extends Document {
  userId: string;
  groupName: string;
  placeListIds: Array<Types.ObjectId>;
}

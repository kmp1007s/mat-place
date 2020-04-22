import { Document, Types } from "mongoose";

export default interface GroupDocument extends Document {
  authorId: string;
  groupName: string;
  placeListIds: Array<Types.ObjectId>;
}

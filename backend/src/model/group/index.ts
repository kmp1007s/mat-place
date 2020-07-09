import { Model, model, Types } from "mongoose";
import GroupSchema from "./schema";
import GroupDocument from "./document";

interface GroupModel extends Model<GroupDocument> {
  createGroup(
    userId: string,
    group: {
      name: string;
      placeListIds?: Array<Types.ObjectId | string>;
    }
  ): Promise<GroupDocument>;
  getGroupByGroupName(userId: string, name: string): Promise<GroupDocument>;
  getGroupNames(userId: string): Promise<Array<string> | null>;
  getPlaceListIdsByGroupName(
    userId: string,
    name: string
  ): Promise<Array<Types.ObjectId>>;
  updateGroup(
    userId: string,
    name: string,
    toUpdate: {
      nameUpdateTo?: string;
      placeListIds?: Array<Types.ObjectId>;
    }
  ): Promise<GroupDocument>;
  deleteGroup(userId: string, name: string): Promise<void>;
}

const Group: GroupModel = model<GroupDocument, GroupModel>(
  "Group",
  GroupSchema
);

export default Group;

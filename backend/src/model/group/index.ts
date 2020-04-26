import { Model, model, Types } from "mongoose";
import GroupSchema from "./schema";
import GroupDocument from "./document";

interface GroupModel extends Model<GroupDocument> {
  createGroup(userId: string, groupName: string): Promise<GroupDocument>;
  getGroupNames(userId: string): Promise<Array<string>>;
  getPlaceListIdsByGroupName(
    userId: string,
    groupName: string
  ): Promise<Array<Types.ObjectId>>;
  updatePlaceListIdsByGroupName(
    userId: string,
    groupName: string,
    placeListIds: Array<Types.ObjectId>
  ): Promise<GroupDocument>;
  deleteGroup(userId: string, groupName: string): Promise<void>;
}

const Group: GroupModel = model<GroupDocument, GroupModel>(
  "Group",
  GroupSchema
);

export default Group;

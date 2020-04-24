import { Model, model, Types } from "mongoose";
import GroupSchema from "./schema";
import GroupDocument from "./document";

interface GroupModel extends Model<GroupDocument> {
  createGroup(authorId: string, groupName: string): Promise<GroupDocument>;
  getGroupNames(authorId: string): Promise<Array<string>>;
  getPlaceListIdsByGroupName(
    authorId: string,
    groupName: string
  ): Promise<Array<Types.ObjectId>>;
  updatePlaceListIdsByGroupName(
    authorId: string,
    groupName: string,
    placeListIds: Array<Types.ObjectId>
  ): Promise<GroupDocument>;
  deleteGroup(authorId: string, groupName: string): Promise<void>;
}

const Group: GroupModel = model<GroupDocument, GroupModel>(
  "Group",
  GroupSchema
);

export default Group;

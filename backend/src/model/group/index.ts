import { Model, model } from "mongoose";
import GroupSchema from "./schema";
import GroupDocument from "./document";

interface GroupModel extends Model<GroupDocument> {
  getGroupNames(authorId: string): Promise<Array<GroupDocument>>;
  getPlaceListIdsByGroups(
    authorId: string,
    groupName: string
  ): Promise<GroupDocument>;
  updatePlaceListIdsByGroups(
    authorId: string,
    groupName: string,
    placeListIds: string
  ): Promise<GroupDocument>;
}

const Group: GroupModel = model<GroupDocument, GroupModel>(
  "Group",
  GroupSchema
);

export default Group;

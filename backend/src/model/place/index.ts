import { Model, model, Types } from "mongoose";
import PlaceListSchema from "./schema";
import PlaceListDocument from "./document";

interface PlaceListInfo {
  userId: string;
  title: string;
  placeList: Array<string>;
}

interface PlaceListModel extends Model<PlaceListDocument> {
  createPlaceList(placeListInfo: PlaceListInfo): Promise<PlaceListDocument>;
  getPlaceListByGroups(
    userId: string,
    group: string
  ): Promise<Array<PlaceListDocument>>;
  getPlaceListByUserId(
    userId: string,
    group?: string
  ): Promise<Array<PlaceListDocument>>;
  updateGroup(
    userId: string,
    ids: Array<Types.ObjectId>,
    group: string
  ): Promise<Array<PlaceListDocument>>;
  deleteGroup(group: string): Promise<Array<PlaceListDocument>>;
}

const PlaceList: PlaceListModel = model<PlaceListDocument, PlaceListModel>(
  "PlaceList",
  PlaceListSchema
);
export default PlaceList;

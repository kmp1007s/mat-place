import { Model, model, Types } from "mongoose";
import PlaceListSchema from "./schema";
import PlaceListDocument from "./document";

interface PlaceInfo {
  title: string;
  placeList: Array<string>;
  group?: string;
}

interface PlaceListModel extends Model<PlaceListDocument> {
  createPlaceList(
    authorId: string,
    placeInfo: PlaceInfo
  ): Promise<PlaceListDocument>;
  findByAuthorId(authorId: string): Promise<Array<PlaceListDocument>>;
  findByGroup(authorId: string, group: string): Promise<PlaceListDocument>;
  updateGroup(
    authorId: string,
    ids: Array<Types.ObjectId>,
    group: string
  ): Promise<Array<PlaceListDocument>>;
}

const PlaceList: PlaceListModel = model<PlaceListDocument, PlaceListModel>(
  "PlaceList",
  PlaceListSchema
);
export default PlaceList;

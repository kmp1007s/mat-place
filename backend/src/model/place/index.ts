import { Model, model, Types } from "mongoose";
import PlaceListSchema from "./schema";
import PlaceListDocument from "./document";

interface PlaceListModel extends Model<PlaceListDocument> {
  createPlaceList(placeListInfo: {
    userId: string;
    title: string;
    placeIds: Array<string>;
  }): Promise<PlaceListDocument>;
  getPlaceListsByGroups(
    userId: string,
    group: string
  ): Promise<Array<PlaceListDocument>>;
  getPlaceListsByUserId(userId: string): Promise<Array<PlaceListDocument>>;
}

const PlaceList: PlaceListModel = model<PlaceListDocument, PlaceListModel>(
  "PlaceList",
  PlaceListSchema
);
export default PlaceList;

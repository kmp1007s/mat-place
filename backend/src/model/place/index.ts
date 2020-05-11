import { Model, model, Types } from "mongoose";
import PlaceListSchema from "./schema";
import PlaceListDocument from "./document";

type MongooseId = string | Types.ObjectId;

interface PlaceListModel extends Model<PlaceListDocument> {
  createPlaceList(
    userId: string,
    placeListInfo: {
      title: string;
      placeIds: Array<string>;
    }
  ): Promise<PlaceListDocument>;
  getAllPlaceListsByUserId(userId: string): Promise<Array<PlaceListDocument>>;
  getPublicPlaceListsByUserId(
    userId: string
  ): Promise<Array<PlaceListDocument>>;
  getPlaceListById(_id: MongooseId): Promise<PlaceListDocument>;
  getAllPlaceListsByGroups(
    userId: string,
    group: string
  ): Promise<Array<PlaceListDocument>>;
  getPublicPlaceListsByGroups(
    userId: string,
    group: string
  ): Promise<Array<PlaceListDocument>>;
  updatePlaceListById(
    _id: MongooseId,
    toUpdate: {
      title?: string;
      placeIds?: Array<String>;
    }
  ): Promise<PlaceListDocument>;
  deletePlaceListById(_id: MongooseId): Promise<void>;
  makePlaceListPublic(_id: MongooseId): Promise<PlaceListDocument>;
  makePlaceListPrivate(_id: MongooseId): Promise<PlaceListDocument>;
}

const PlaceList: PlaceListModel = model<PlaceListDocument, PlaceListModel>(
  "PlaceList",
  PlaceListSchema
);
export default PlaceList;

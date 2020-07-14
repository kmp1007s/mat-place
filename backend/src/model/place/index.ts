import { Model, model, Types } from "mongoose";
import PlaceListSchema from "./schema";
import PlaceListDocument from "./document";
import { Place } from "./document";

type MongooseId = string | Types.ObjectId;

interface PlaceListModel extends Model<PlaceListDocument> {
  createPlaceList(
    userId: string,
    placeListInfo: {
      title: string;
      places: Array<Place>;
      public: boolean;
    }
  ): Promise<PlaceListDocument>;
  getAllPublicPlaceLists(): Promise<Array<PlaceListDocument> | null>;
  getAllPlaceListsByUserId(
    userId: string
  ): Promise<Array<PlaceListDocument> | null>;
  getPublicPlaceListsByUserId(
    userId: string
  ): Promise<Array<PlaceListDocument> | null>;
  getPlaceListById(_id: MongooseId): Promise<PlaceListDocument>;
  getAllPlaceListsByGroups(
    userId: string,
    group: string
  ): Promise<Array<PlaceListDocument> | null>;
  getPublicPlaceListsByGroups(
    userId: string,
    group: string
  ): Promise<Array<PlaceListDocument> | null>;
  updatePlaceListById(
    _id: MongooseId,
    toUpdate: {
      title?: string;
      places?: Array<Place>;
      public?: boolean;
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

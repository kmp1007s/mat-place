import { Schema } from "mongoose";
import groupModel from "model/group";

const Place = new Schema({
  id: String,
  name: String,
  address: String,
  phone: String,
});

/* 장소 리스트 Schema, 그룹별로 관리할 수 있음 */
const PlaceListSchema: Schema = new Schema({
  userId: String,
  title: String,
  places: [Place], // Place 정보 전체 관리가 아닌 Place Id만 관리
  public: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

PlaceListSchema.statics.createPlaceList = function (userId, placeListInfo) {
  return new this({ userId, ...placeListInfo }).save();
};

PlaceListSchema.statics.getAllPlaceListsByUserId = async function (userId) {
  const placeLists = await this.find({ userId });
  return placeLists.length > 0 ? placeLists : null;
};

PlaceListSchema.statics.getPublicPlaceListsByUserId = async function (userId) {
  const placeLists = await this.find({ userId, public: true });
  return placeLists.length > 0 ? placeLists : null;
};

PlaceListSchema.statics.getPlaceListById = function (_id) {
  return this.findOne({ _id });
};

PlaceListSchema.statics.getAllPlaceListsByGroups = async function (
  userId,
  group
) {
  const placeListIds = await groupModel.getPlaceListIdsByGroupName(
    userId,
    group
  );

  const placeLists = await this.find({ _id: { $in: placeListIds } });
  return placeLists.length > 0 ? placeLists : null;
};

PlaceListSchema.statics.getPublicPlaceListsByGroups = async function (
  userId,
  group
) {
  const placeListIds = await groupModel.getPlaceListIdsByGroupName(
    userId,
    group
  );

  const placeLists = await this.find({
    _id: { $in: placeListIds },
    public: true,
  });
  return placeLists.length > 0 ? placeLists : null;
};

PlaceListSchema.statics.updatePlaceListById = function (_id, toUpdate) {
  return this.findOneAndUpdate({ _id }, toUpdate, { new: true });
};

PlaceListSchema.statics.deletePlaceListById = async function (_id) {
  await this.deleteOne({ _id });
};

PlaceListSchema.statics.makePlaceListPublic = function (_id) {
  return this.findOneAndUpdate(
    { _id },
    { public: true },
    {
      new: true,
    }
  );
};

PlaceListSchema.statics.makePlaceListPrivate = function (_id) {
  return this.findOneAndUpdate(
    { _id },
    { public: false },
    {
      new: true,
    }
  );
};

export default PlaceListSchema;

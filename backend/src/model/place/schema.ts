import { Schema } from "mongoose";
import groupModel from "model/group";

// /* 장소 Schema Kakao API 기준 */
// export const PlaceSchema: Schema = new Schema({
//   id: String,
//   place_name: String,
//   category_name: String,
//   phone: String,
//   road_address_name: String,
//   place_url: String,
// });

/* 장소 리스트 Schema, 그룹별로 관리할 수 있음 */
const PlaceListSchema: Schema = new Schema({
  userId: String,
  title: String,
  placeIds: [String], // Place 정보 전체 관리가 아닌 Place Id만 관리
  public: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

PlaceListSchema.statics.createPlaceList = function (userId, placeListInfo) {
  return new this({ userId, ...placeListInfo }).save();
};

PlaceListSchema.statics.getAllPlaceListsByUserId = function (userId) {
  return this.find({ userId });
};

PlaceListSchema.statics.getPublicPlaceListsByUserId = function (userId) {
  return this.find({ userId, public: true });
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

  if (placeListIds) return this.find({ _id: { $in: placeListIds } });
};

PlaceListSchema.statics.getPublicPlaceListsByGroups = async function (
  userId,
  group
) {
  const placeListIds = await groupModel.getPlaceListIdsByGroupName(
    userId,
    group
  );

  if (placeListIds)
    return this.find({ _id: { $in: placeListIds }, public: true });
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

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
});

PlaceListSchema.statics.createPlaceList = function (placeListInfo) {
  return new this(placeListInfo).save();
};

PlaceListSchema.statics.getPlaceListByGroups = async function (userId, group) {
  const placeListIds = await groupModel.getPlaceListIdsByGroupName(
    userId,
    group
  );
  return placeListIds ? this.find({ _id: { $in: placeListIds } }) : [];
};

PlaceListSchema.statics.getPlaceListByUserId = function (userId) {
  return this.find({ userId });
};

PlaceListSchema.statics.updateGroup = async function (userId, ids, group) {
  await this.updateMany({ userId, _id: { $in: ids } }, { $set: { group } });
  return this.find({ userId, _id: { $in: ids } });
};

PlaceListSchema.statics.deleteGroup = async function (group) {
  await this.updateMany({ group }, { group: "none" });
  return this.find({ group: "none" });
};

export default PlaceListSchema;

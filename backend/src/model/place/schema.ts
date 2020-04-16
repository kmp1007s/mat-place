import { Schema } from "mongoose";

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
  authorId: String,
  title: String,
  placeList: [String], // Place 정보 전체 관리가 아닌 Place Id만 관리
  group: {
    type: String,
    default: "none",
  },
});

PlaceListSchema.statics.createPlaceList = function (authorId, placeInfo) {
  return new this({
    authorId,
    ...placeInfo,
  }).save();
};

PlaceListSchema.statics.findByAuthorId = function (authorId) {
  return this.find({ authorId });
};

PlaceListSchema.statics.findByGroup = function (authorId, group) {
  return this.find({ authorId, group });
};

PlaceListSchema.statics.updateGroup = async function (authorId, ids, group) {
  await this.updateMany({ authorId, _id: { $in: ids } }, { $set: { group } });
  return this.find({ authorId, _id: { $in: ids } });
};

export default PlaceListSchema;

import { Schema } from "mongoose";

const GroupSchema = new Schema({
  authorId: String,
  groupName: String,
  placeListIds: [Schema.Types.ObjectId],
});

GroupSchema.statics.getGroupNames = function (authorId) {
  return this.find({ authorId }, { _id: 0, groupName: 1 });
};

GroupSchema.statics.getPlaceListIdsByGroups = function (authorId, groupName) {
  return this.findOne({ authorId, groupName });
};

GroupSchema.statics.updatePlaceListIdsByGroups = function (
  authorId,
  groupName,
  placeListIds
) {
  return this.findOneAndUpdate(
    { authorId, groupName },
    { placeListIds },
    { new: true }
  );
};

export default GroupSchema;

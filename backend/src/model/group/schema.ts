import { Schema } from "mongoose";

const GroupSchema = new Schema({
  authorId: String,
  groupName: String,
  placeListIds: [Schema.Types.ObjectId],
});

GroupSchema.statics.createGroup = async function (authorId, groupName) {
  const exists = await this.find({ authorId, groupName });

  if (!exists)
    return new this({
      authorId,
      groupName,
      placeListIds: [],
    }).save();
};

GroupSchema.statics.getGroupNames = function (authorId) {
  return new Promise(async (resolve, reject) => {
    const groupNames = [];
    const groupDocs = await this.find({ authorId });
    groupDocs.foreach((groupDoc) => {
      groupNames.push(groupDoc);
    });
    resolve(groupNames);
  });
};

GroupSchema.statics.getPlaceListIdsByGroupName = function (
  authorId,
  groupName
) {
  return new Promise(async (resolve, reject) => {
    const groupDoc = await this.findOne({ authorId, groupName });
    resolve(groupDoc.placeListIds);
  });
};

GroupSchema.statics.updatePlaceListIdsByGroupName = function (
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

GroupSchema.statics.deleteGroup = async function (authorId, groupName) {
  await this.deleteOne({ authorId, groupName });
};

export default GroupSchema;

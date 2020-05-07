import { Schema } from "mongoose";

const GroupSchema = new Schema({
  userId: String,
  groupName: String,
  placeListIds: [Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now },
});

GroupSchema.statics.createGroup = async function (
  userId,
  groupName,
  placeListIds
) {
  return new this({
    userId,
    groupName,
    placeListIds: placeListIds || [],
  }).save();
};

GroupSchema.statics.getGroupNames = function (userId) {
  return new Promise(async (resolve, reject) => {
    const groupNames = [];
    const groupDocs = await this.find({ userId });
    groupDocs.forEach((groupDoc) => {
      groupNames.push(groupDoc.groupName);
    });
    resolve(groupNames);
  });
};

GroupSchema.statics.groupExists = async function (userId, groupName) {
  const groupNames = await this.getGroupNames(userId);
  return groupNames.includes(groupName);
};

GroupSchema.statics.getPlaceListIdsByGroupName = function (userId, groupName) {
  return new Promise(async (resolve, reject) => {
    const groupDoc = await this.findOne({ userId, groupName });
    if (groupDoc) resolve(groupDoc.placeListIds);
  });
};

GroupSchema.statics.updateGroup = function (userId, groupName, updateData) {
  return this.findOneAndUpdate({ userId, groupName }, updateData, {
    new: true,
  });
};

GroupSchema.statics.deleteGroup = async function (userId, groupName) {
  await this.deleteOne({ userId, groupName });
};

export default GroupSchema;

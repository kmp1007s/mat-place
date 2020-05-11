import { Schema } from "mongoose";

const GroupSchema = new Schema({
  userId: String,
  groupName: String,
  placeListIds: { type: [Schema.Types.ObjectId], default: [] },
  createdAt: { type: Date, default: Date.now },
});

GroupSchema.statics.createGroup = async function (userId, group) {
  return new this({ userId, group }).save();
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

GroupSchema.statics.getGroupByGroupName = function (userId, groupName) {
  return this.findOne({ userId, groupName });
};

GroupSchema.statics.getPlaceListIdsByGroupName = async function (
  userId,
  groupName
) {
  const groupDoc = await this.findOne({ userId, groupName });
  if (groupDoc) return groupDoc.placeListIds;
};

GroupSchema.statics.updateGroup = function (userId, groupName, toUpdate) {
  return this.findOneAndUpdate({ userId, groupName }, toUpdate, {
    new: true,
  });
};

GroupSchema.statics.deleteGroup = function (userId, groupName) {
  return this.deleteOne({ userId, groupName });
};

export default GroupSchema;

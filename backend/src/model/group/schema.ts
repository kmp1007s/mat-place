import { Schema } from "mongoose";

const GroupSchema = new Schema({
  userId: String,
  groupName: String,
  placeListIds: [Schema.Types.ObjectId],
});

GroupSchema.statics.createGroup = async function (userId, groupName) {
  const exists = await this.find({ userId, groupName });

  if (!exists)
    return new this({
      userId,
      groupName,
      placeListIds: [],
    }).save();
};

GroupSchema.statics.getGroupNames = function (userId) {
  return new Promise(async (resolve, reject) => {
    const groupNames = [];
    const groupDocs = await this.find({ userId });
    groupDocs.foreach((groupDoc) => {
      groupNames.push(groupDoc);
    });
    resolve(groupNames);
  });
};

GroupSchema.statics.getPlaceListIdsByGroupName = function (userId, groupName) {
  return new Promise(async (resolve, reject) => {
    const groupDoc = await this.findOne({ userId, groupName });
    if (groupDoc) resolve(groupDoc.placeListIds);
  });
};

GroupSchema.statics.updatePlaceListIdsByGroupName = function (
  userId,
  groupName,
  placeListIds
) {
  return this.findOneAndUpdate(
    { userId, groupName },
    { placeListIds },
    { new: true }
  );
};

GroupSchema.statics.deleteGroup = async function (userId, groupName) {
  await this.deleteOne({ userId, groupName });
};

export default GroupSchema;

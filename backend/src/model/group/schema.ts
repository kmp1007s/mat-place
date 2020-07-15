import { Schema } from "mongoose";

const GroupSchema = new Schema({
  userId: String,
  name: String,
  placeListIds: { type: [Schema.Types.ObjectId], default: [] },
  createdAt: { type: Date, default: Date.now },
});

GroupSchema.statics.createGroup = async function (userId, group) {
  return new this({
    userId,
    ...group,
  }).save();
};

GroupSchema.statics.getGroupNames = function (userId) {
  return new Promise(async (resolve, reject) => {
    const groupNames = [];
    const groupDocs = await this.find({ userId });
    groupDocs.forEach((groupDoc) => {
      groupNames.push(groupDoc.name);
    });

    if (groupNames.length > 0) resolve(groupNames);
    else resolve(null);
  });
};

GroupSchema.statics.getGroups = async function (userId) {
  const docs = await this.find({
    userId,
  });
  return docs.length > 0 ? docs : null;
};

GroupSchema.statics.getGroupByGroupName = function (userId, name) {
  return this.findOne({ userId, name });
};

GroupSchema.statics.getPlaceListIdsByGroupName = async function (userId, name) {
  const groupDoc = await this.findOne({ userId, name });
  if (groupDoc) return groupDoc.placeListIds;
};

GroupSchema.statics.updateGroup = async function (userId, name, toUpdate) {
  if (toUpdate.placeListIds) {
    const docs = await this.find({
      userId,
      placeListIds: { $in: toUpdate.placeListIds },
    });

    if (docs.length > 0) {
      for (let doc of docs) {
        const docPlaceListIds = doc.placeListIds.map((placeListId) =>
          (" " + placeListId).slice(1)
        );

        const placeListIdsUpdated = docPlaceListIds.filter(
          (placeListId) => !toUpdate.placeListIds.includes(placeListId)
        );

        console.log(placeListIdsUpdated);
        doc.placeListIds = placeListIdsUpdated;

        await doc.save();
      }
    }
  }

  return this.findOneAndUpdate({ userId, name }, toUpdate, {
    new: true,
  });
};

GroupSchema.statics.deleteGroup = function (userId, name) {
  return this.deleteOne({ userId, name });
};

export default GroupSchema;

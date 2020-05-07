import { Schema } from "mongoose";

const ReviewSchema: Schema = new Schema({
  userId: String,
  title: String,
  content: String,
  placeId: String,
  rates: Number,
  createdAt: { type: Date, default: Date.now },
});

ReviewSchema.statics.createReview = function (reviewData) {
  return new this(reviewData).save();
};

ReviewSchema.statics.getAllReviews = function () {
  return this.find().sort({ createdAt: -1 });
};

ReviewSchema.statics.getReviewById = function (_id) {
  return this.find({ _id });
};

ReviewSchema.statics.updateReviewById = function (_id, toUpdate) {
  return this.findOneAndUpdate({ _id }, toUpdate);
};

ReviewSchema.statics.deleteReviewById = function (_id) {
  return this.deleteOne({ _id });
};

export default ReviewSchema;

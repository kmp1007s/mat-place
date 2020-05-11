import { Model, model, Types } from "mongoose";
import ReviewSchema from "./schema";
import ReviewDocument from "./document";

interface ReviewModel extends Model<ReviewDocument> {
  createReview(
    userId: string,
    reviewData: {
      title: string;
      content: string;
      placeId: string;
      rates: number;
    }
  ): Promise<ReviewDocument>;
  getAllReviews(): Promise<Array<ReviewDocument>>;
  getReviewById(_id: string | Types.ObjectId): Promise<ReviewDocument>;
  updateReviewById(
    _id: string | Types.ObjectId,
    toUpdate: {
      title?: string;
      content?: string;
      placeId?: string;
      rates?: number;
    }
  ): Promise<ReviewDocument>;
  deleteReviewById(_id: string | Types.ObjectId): Promise<void>;
}

const PlaceList: ReviewModel = model<ReviewDocument, ReviewModel>(
  "Review",
  ReviewSchema
);
export default PlaceList;

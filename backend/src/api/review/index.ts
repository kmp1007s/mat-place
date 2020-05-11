import { Router } from "express";
import * as reviewCtrl from "./review.ctrl";
import loginCheck from "lib/auth/login";

const review = Router();

review.post("/", loginCheck, reviewCtrl.createReview);
review.get("/", reviewCtrl.getAllReviews);
review.get("/:id", reviewCtrl.getReviewById);
review.patch("/:id", loginCheck, reviewCtrl.updateReviewById);
review.delete("/:id", loginCheck, reviewCtrl.deleteReviewById);

export default review;

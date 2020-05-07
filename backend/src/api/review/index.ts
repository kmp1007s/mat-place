import { Router } from "express";
import * as reviewCtrl from "./review.ctrl";
import loginMiddleWare from "lib/login";

const review = Router();

review.post("/", reviewCtrl.createReview);
review.get("/", reviewCtrl.getAllReviews);
review.get("/:id", reviewCtrl.getReviewById);
review.patch("/:id", [loginMiddleWare, reviewCtrl.updateReviewById]);
review.delete("/:id", [loginMiddleWare, reviewCtrl.deleteReviewById]);

export default review;

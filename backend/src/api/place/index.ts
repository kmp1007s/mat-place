import { Router } from "express";
import * as placeCtrl from "./place.ctrl";
import loginMiddleWare from "lib/login";

const place = Router();
place.use(loginMiddleWare);

place.get("/", placeCtrl.readPlaceList);
place.post("/", placeCtrl.cretePlaceList);
place.patch("/group", placeCtrl.updateGroup);
place.delete("/group/:name", placeCtrl.deleteGroup);

export default place;

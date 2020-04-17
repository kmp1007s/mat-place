import { Router } from "express";
import * as placeCtrl from "./place.ctrl";
import loginMiddleWare from "lib/login";

const place = Router();
place.use(loginMiddleWare);

place.get("/list", placeCtrl.readPlaceList);
place.post("/list", placeCtrl.cretePlaceList);
place.get("/group/:name", placeCtrl.readByGroup);
place.patch("/group", placeCtrl.updateGroup);
place.delete("/group/:name", placeCtrl.deleteGroup);

export default place;

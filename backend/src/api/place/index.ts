import { Router } from "express";
import * as placeCtrl from "./place.ctrl";
import loginMiddleWare from "lib/login";

const place = Router();
place.use(loginMiddleWare);

place.get("/", placeCtrl.readPlaceList);
place.post("/", placeCtrl.cretePlaceList);
place.post("/groups", placeCtrl.createGroup);
place.patch("/groups/:name", placeCtrl.updateGroup);
place.delete("/groups/:name", placeCtrl.deleteGroup);

export default place;

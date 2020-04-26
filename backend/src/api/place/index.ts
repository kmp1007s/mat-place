import { Router } from "express";
import * as placeCtrl from "./place.ctrl";
import loginMiddleWare from "lib/login";

const place = Router();
place.use(loginMiddleWare);

place.post("/", placeCtrl.cretePlaceList);
place.post("/groups", placeCtrl.createGroup);
place.get("/", placeCtrl.readPlaceList);
place.patch("/groups/:name", placeCtrl.updateGroup);
place.delete("/groups/:name", placeCtrl.deleteGroup);

export default place;

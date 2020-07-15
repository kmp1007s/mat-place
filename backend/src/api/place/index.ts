import { Router } from "express";
import * as placeCtrl from "./place.ctrl";
import loginCheck from "lib/auth/login";

const place = Router();

place.post("/", loginCheck, placeCtrl.cretePlaceList);

place.get("/", placeCtrl.getAllPublicPlaceList);
place.get("/:id", placeCtrl.getPlaceListById);
place.get("/users/:id", placeCtrl.getPlaceListsByUserId);

place.patch("/:id", loginCheck, placeCtrl.updatePlaceListById);
place.delete("/:id", loginCheck, placeCtrl.deletePlaceListById);

place.post("/public/:id", loginCheck, placeCtrl.makePlaceListPublic);
place.post("/private/:id", loginCheck, placeCtrl.makePlaceListPrivate);

place.get("/groups/users/:userId", placeCtrl.getGroupsByUserId);
place.get("/groups/:name", placeCtrl.getGroup);

place.post("/groups", loginCheck, placeCtrl.createGroup);
place.patch("/groups/:name", loginCheck, placeCtrl.updateGroup);
place.delete("/groups/:name", loginCheck, placeCtrl.deleteGroup);

export default place;

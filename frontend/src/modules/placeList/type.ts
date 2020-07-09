import { ActionType } from "typesafe-actions";
import * as actions from "./action";
import { PlaceLists } from "api/place";

export type LoadingState = "UNSTARTED" | "STARTED" | "SUCCESS" | "FAIL";
export type PlaceAction = ActionType<typeof actions>;
export type PlaceState = {
  placeLists: PlaceLists | undefined;
  loading: LoadingState;
};

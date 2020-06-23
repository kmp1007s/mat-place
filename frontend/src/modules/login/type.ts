import { ActionType } from "typesafe-actions";
import * as actions from "./action";

export type LoadingState = "UNSTARTED" | "STARTED" | "SUCCESS" | "FAIL";
export type LoginAction = ActionType<typeof actions>;
export type LoginState = {
  userId: string;
  loading: LoadingState;
};

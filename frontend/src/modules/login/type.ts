import { ActionType } from "typesafe-actions";
import * as actions from "./action";

export type LoginAction = ActionType<typeof actions>;
export type LoginState = {
  userId: string;
  loading: "UNSTARTED" | "STARTED" | "SUCCESS" | "FAIL";
};

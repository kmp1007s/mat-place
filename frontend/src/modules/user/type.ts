import { ActionType } from "typesafe-actions";
import * as actions from "./action";
import { UserResponse } from "api/user";

export type User = UserResponse | null;

export type LoadingState = "UNSTARTED" | "STARTED" | "SUCCESS" | "FAIL";
export type UserAction = ActionType<typeof actions>;
export type UserState = {
  user: User;
  loading: LoadingState;
};

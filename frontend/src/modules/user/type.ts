import { ActionType } from "typesafe-actions";
import * as actions from "./action";
import { UserResponse } from "api/user";

export type User = UserResponse | null;

export type UserAction = ActionType<typeof actions>;
export type UserState = {
  user: User;
  loading: "UNSTARTED" | "STARTED" | "SUCCESS" | "FAIL";
};

import { DecodedToken } from "lib/jwt";

declare module "express" {
  interface Request {
    user?: DecodedToken;
  }
}

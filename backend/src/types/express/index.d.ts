import { DecodedToken } from "lib/auth/jwt";

declare module "express" {
  interface Request {
    user?: DecodedToken;
  }

  interface Response {
    badRequest(reason: string): void;
    unauthorized(specificallyReason?: string): void;
    forbidden(specificallyReason?: string): void;
    notFound(object: string): void;
    conflict(object: string): void;
  }
}

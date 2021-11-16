import { NextFunction, Request, Response } from "express";
import { ReqUser } from "../custom";
import { BadRequestError } from "../errors/bad-request-error";
import { AuthService } from "../services/auth-service";

export interface ReqWithUser extends Request {
  user?: ReqUser
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new BadRequestError("Not logged in.");
  }

  next();
}




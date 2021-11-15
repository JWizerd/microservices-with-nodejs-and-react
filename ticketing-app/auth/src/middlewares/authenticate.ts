import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { AuthService } from "../services/auth-service";

export interface ReqUser {
  email: string
  role: string
  id: string
}

export interface ReqWithUser extends Request {
  user?: ReqUser
}

export const authenticate = async (req: ReqWithUser, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.jwt) {
    throw new BadRequestError("Not logged in.");
  }

  const user = await AuthService.verify(req.session.jwt) as ReqUser;

  if (!user) {
    throw new BadRequestError("Token is either expired or not valid. Please login again.");
  }

  req.user = user;

  next();
}




import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { AuthService } from "../services/auth-service";
import { ReqUser } from "../custom";

export const attachUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }

  const user = await AuthService.verify(req.session.jwt) as ReqUser;

  if (!user) {
    return next();
  }

  req.user = user;

  next();
}



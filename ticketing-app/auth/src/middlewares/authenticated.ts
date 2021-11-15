import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { AuthService } from "../services/auth-service";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.jwt) {
    throw new BadRequestError("Not logged in.");
  }

  const valid = await AuthService.verify(req.session.jwt);

  if (!valid) {
    throw new BadRequestError("Token is either expired or not valid. Please login again.");
  }

  next();
}




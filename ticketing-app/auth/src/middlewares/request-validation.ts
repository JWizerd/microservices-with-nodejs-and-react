import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
import { ApiValidationError } from "../errors/api-validation-error";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiValidationError(errors.array());
  }
}
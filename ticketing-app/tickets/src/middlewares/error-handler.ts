import { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors/base-error";
import { getLogger } from "../logger/create-client";

const logger = getLogger();


export const errorHandler = (err: BaseError | Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json(err.serializeError());
  }

  res.status(500).json({ errors: [{ message: err.message }] });
}
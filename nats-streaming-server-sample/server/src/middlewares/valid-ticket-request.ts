import { NextFunction, Request, Response } from "express";

export const validTicketRequest = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.title || req.body.title.length < 5) {
    return res.status(400).json({
      message: 'title is required'
    });
  }

  if (!req.body.price || typeof req.body.price !== 'number') {
    return res.status(400).json({
      message: 'price is required, and needs to be of type int'
    });
  }

  next();
}
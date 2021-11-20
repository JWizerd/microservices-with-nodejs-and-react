import { Request, Response, NextFunction } from "express";

export const CorsWhitelistOrigin = (origins: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const originHeader = req.header('origin') || "";
    var origin = origins.indexOf(originHeader.toLowerCase()) > -1 ? req.headers.origin : "*";
    res.header("Access-Control-Allow-Origin", origin);
    next();
  }
}

export default CorsWhitelistOrigin;
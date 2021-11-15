import express, { Response } from "express";
import { User } from "../database/models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { getLogger } from "../logger/create-client";
import { authenticate, ReqWithUser } from "../middlewares/authenticate";

const router = express.Router();
const logger = getLogger();

router.get("/api/users/currentuser", authenticate, async (req: ReqWithUser, res: Response) => {
  logger.info("Fetching current user");

  if (req.user) {
    return res.json(req.user);
  }

  throw new BadRequestError("User does not exist");
});

export { router as currentUserRouter };
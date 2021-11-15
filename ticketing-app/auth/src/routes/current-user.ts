import express from "express";
import { getLogger } from "../logger/create-client";

const router = express.Router();
const logger = getLogger();

router.get("/api/users/currentuser", (req, res) => {
  logger.info("Fetching current user");

  res.json({
    message: "Hello Current User!"
  });
});

export { router as currentUserRouter };
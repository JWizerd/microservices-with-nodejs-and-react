import express from "express";
import { getLogger } from "../logger/create-client";
import { isAuthenticated } from "../middlewares/authenticated";

const router = express.Router();
const logger = getLogger();

router.get("/api/users/currentuser", isAuthenticated, (req, res) => {
  logger.info("Fetching current user");

  res.json({
    message: "Hello Current User!"
  });
});

export { router as currentUserRouter };
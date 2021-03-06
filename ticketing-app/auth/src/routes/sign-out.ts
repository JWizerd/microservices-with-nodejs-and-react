import express from "express";
import { getLogger } from "../logger/create-client";

const router = express.Router();
const logger = getLogger();

router.get("/api/users/signout", (req, res) => {
  logger.info("Logging user out!");

  req.session = null;

  res.send({});
});

export { router as signOutUserRouter };
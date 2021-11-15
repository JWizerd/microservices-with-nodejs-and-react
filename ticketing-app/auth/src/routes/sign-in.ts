import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ApiValidationError } from "../errors/api-validation-error";
import { getLogger } from "../logger/create-client";

const router = express.Router();
const logger = getLogger();

const validator = [
  body('email')
    .isEmail()
    .withMessage("email must be valid email"),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("password must be between 4 and 20 characters")
];

router.post("/api/users/signin", validator, (req: Request, res: Response): void => {
  logger.info("Logging user in!");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiValidationError(errors.array());
  }

  logger.info("creating a user!");

  res.send({});
});

export { router as signInUserRouter };
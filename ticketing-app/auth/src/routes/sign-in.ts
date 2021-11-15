import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ApiValidationError } from "../errors/api-validation-error";
import { getLogger } from "../logger/create-client";
import { User } from "../database/models/user";
import { AuthService } from "../services/auth-service";
import { BadRequestError } from "../errors/bad-request-error";

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

router.post("/api/users/signin", validator, async (req: Request, res: Response) => {
  logger.info("Logging user in!");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiValidationError(errors.array());
  }

  const { password, email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser === null) {
    throw new BadRequestError("User doesn't exist.");
  }

  const valid = await AuthService.compareHashes(password, existingUser.password);

  if (!valid) {
    throw new BadRequestError("Email or password is incorrect.")
  }

  res.status(200).send();
});

export { router as signInUserRouter };
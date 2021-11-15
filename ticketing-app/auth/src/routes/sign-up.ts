import express, { Request, Response } from "express";
import { body } from "express-validator";
import { getLogger } from "../logger/create-client";
import { User } from "../database/models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { AuthService } from "../services/auth-service";
import { validateRequest } from "../middlewares/request-validation";

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

router.post("/api/users/signup", validator, validateRequest, async (req: Request, res: Response) => {
  logger.info("Logging user in!");

  const existingUser = await User.findOne({ email: req.body.email });

  const { email, password } = req.body;

  if (existingUser) {
    throw new BadRequestError("User already exists.");
  }

  logger.info("creating a user!");
  const model = User.build({ email, password, });
  const { id } = await User.create(model);

  const jwt = await AuthService.sign({ email, id, role: "Standard" });

  req.session = { jwt };

  res.status(201).send();
});

export { router as signUpUserRouter };
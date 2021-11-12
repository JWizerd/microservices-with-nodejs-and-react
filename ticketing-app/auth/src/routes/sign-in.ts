import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

const validator = [
  body('email')
    .isEmail()
    .withMessage("email must be valid email"),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("password must be between 4 and 20 characters")
];

router.post("/api/users/signin", validator, (req: Request, res: Response) => {
  console.log("Logging user in!");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new Error("Invalid email or password");
  }

  console.log("creating a user!");

  res.send({});
});

export { router as signInUserRouter };
import { ValidationError } from "express-validator";
import { BaseError } from "./base-error";

export class ApiValidationError extends BaseError {
  statusCode = 400;

  constructor(protected errors: ValidationError[]) {
    super(`
    \n=====================
    \nAPI VALIDATION ERROR:
    \n${JSON.stringify(errors)}
    \n=====================
    `);

    // just because we are extending a built in class
    Object.setPrototypeOf(this, ApiValidationError.prototype);
  }

  serializeError() {
    const errors = this.errors.map((e) => ({
      message: e.msg,
      field: e.param
    }));

    return { errors }
  }
}
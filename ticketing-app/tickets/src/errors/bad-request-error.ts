import { BaseError } from "./base-error";

export class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(message = "Whoops! Something went wrong. That's all we know.") {
    super(message);

    // just because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return {
      errors: [
        {
          message: this.message
        }
      ]
    }
  }
}
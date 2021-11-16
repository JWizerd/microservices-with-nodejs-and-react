import { BaseError } from "./base-error";

export class NotAuthenticatedError extends BaseError {
  statusCode = 401;

  constructor(message = "Not Authenticated") {
    super(message);

    // just because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
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
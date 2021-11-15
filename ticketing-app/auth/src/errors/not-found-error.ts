import { BaseError } from "./base-error";

export class NotFoundError extends BaseError {
  statusCode = 404;

  constructor(message = "ROUTE NOT FOUND") {
    super(message);

    // just because we are extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
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
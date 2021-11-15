import { BaseError } from "./base-error";

export class DatabaseConnectionError extends BaseError {
  statusCode = 500;

  constructor(protected reason = "Error Connecting To Database") {
    super(`
    \n=====================
    \nAPI VALIDATION ERROR:
    \n${reason}
    \n=====================
    `);

    // just because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return {
      errors: [
        {
          message: this.reason
        }
      ]
    }
  }
}
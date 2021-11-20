export interface ErrorResponse {
  errors: {
    message: string
    field?: string
  }[]
}

export abstract class BaseError extends Error {
  abstract statusCode: number;
  abstract serializeError(): ErrorResponse;

  constructor(message: string) {
    super(message);

    // just because we are extending a built in class
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
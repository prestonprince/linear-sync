import type { ContentfulStatusCode } from "hono/utils/http-status";

/**
 * Custom error class that extends the standard Error class
 * and includes an HTTP status code.
 */
export class HttpStatusError extends Error {
  /**
   * HTTP status code associated with this error
   */
  public statusCode: ContentfulStatusCode;

  /**
   * Creates a new HttpStatusError
   *
   * @param message - Error message
   * @param statusCode - HTTP status code (defaults to 500)
   */
  constructor(message: string, statusCode: ContentfulStatusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;

    // This is needed to properly capture stack traces in TypeScript
    Object.setPrototypeOf(this, HttpStatusError.prototype);
  }

  /**
   * Create a standard 400 Bad Request error
   */
  static badRequest(message: string = "Bad Request"): HttpStatusError {
    return new HttpStatusError(message, 400);
  }

  /**
   * Create a standard 401 Unauthorized error
   */
  static unauthorized(message: string = "Unauthorized"): HttpStatusError {
    return new HttpStatusError(message, 401);
  }

  /**
   * Create a standard 403 Forbidden error
   */
  static forbidden(message: string = "Forbidden"): HttpStatusError {
    return new HttpStatusError(message, 403);
  }

  /**
   * Create a standard 404 Not Found error
   */
  static notFound(message: string = "Not Found"): HttpStatusError {
    return new HttpStatusError(message, 404);
  }

  /**
   * Create a standard 500 Internal Server Error
   */
  static internal(message: string = "Internal Server Error"): HttpStatusError {
    return new HttpStatusError(message, 500);
  }
}

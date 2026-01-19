import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseHelper } from '../helper/apiResponse.helper';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any = null;
    let data: any = null;

    // Handle different types of exceptions
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        message = (exceptionResponse as any).message || exception.message;
        errors = (exceptionResponse as any).errors;
        data = (exceptionResponse as any).data;
      } else {
        message = exceptionResponse;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      // Log non-HTTP errors
      this.logger.error(`${request.method} ${request.url}`, exception.stack);
    }

    // Log the error
    this.logger.error(
      `Error: ${message}, Status: ${status}, Path: ${request.url}, Method: ${request.method}`,
    );

    // Determine which ApiResponseHelper method to use based on status code
    let apiResponse;

    switch (status) {
      case HttpStatus.BAD_REQUEST:
        apiResponse = ApiResponseHelper.badRequest(message, data, errors);
        break;
      case HttpStatus.UNAUTHORIZED:
        apiResponse = ApiResponseHelper.unauthorized(message, data);
        break;
      case HttpStatus.FORBIDDEN:
        apiResponse = ApiResponseHelper.forbidden(message, data);
        break;
      case HttpStatus.NOT_FOUND:
        apiResponse = ApiResponseHelper.notFound(message, data);
        break;
      case HttpStatus.CONFLICT:
        apiResponse = ApiResponseHelper.conflict(message, data);
        break;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        apiResponse = ApiResponseHelper.unprocessableEntity(
          message,
          data,
          errors,
        );
        break;
      default:
        // For all other errors, use generic error method
        apiResponse = ApiResponseHelper.error(message, data, {
          code: status,
          errors,
          path: request.url,
          ...(process.env.NODE_ENV === 'development' &&
          exception instanceof Error
            ? { stack: exception.stack }
            : {}),
        });
    }

    // Add additional info
    apiResponse.path = request.url;
    apiResponse.timestamp = new Date().toISOString();

    // Send response
    response.status(status).json(apiResponse);
  }
}

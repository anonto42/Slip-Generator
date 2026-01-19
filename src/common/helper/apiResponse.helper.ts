// src/common/helpers/api-response.helper.ts

export interface ApiResponse<T = any> {
  status: boolean;
  code: number;
  message: string;
  data?: T;
  timestamp?: string;
  path?: string;
  errors?: any[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export class ApiResponseHelper {
  private response: ApiResponse;

  constructor() {
    this.response = {
      status: true,
      code: 200,
      message: 'Success',
      timestamp: new Date().toISOString(),
    };
  }

  // Static success methods
  public static success<T = any>(
    message: string,
    data?: T,
    options?: Partial<ApiResponse<T>>,
  ): ApiResponse<T> {
    return {
      status: true,
      code: options?.code || 200,
      message,
      data,
      timestamp: new Date().toISOString(),
      ...options,
    };
  }

  // Static error methods
  public static error<T = any>(
    message: string,
    data?: T,
    options?: Partial<ApiResponse<T>>,
  ): ApiResponse<T> {
    return {
      status: false,
      code: options?.code || 400,
      message,
      data,
      timestamp: new Date().toISOString(),
      ...options,
    };
  }

  // Builder pattern for more control
  static builder<T = any>(): ApiResponseBuilder<T> {
    return new ApiResponseBuilder<T>();
  }

  // Convenience methods
  public static created<T = any>(message: string, data?: T): ApiResponse<T> {
    return ApiResponseHelper.success(message, data, { code: 201 });
  }

  public static accepted<T = any>(message: string, data?: T): ApiResponse<T> {
    return ApiResponseHelper.success(message, data, { code: 202 });
  }

  public static noContent(message: string): ApiResponse {
    return ApiResponseHelper.success(message, undefined, { code: 204 });
  }

  public static badRequest<T = any>(
    message: string,
    data?: T,
    errors?: any[],
  ): ApiResponse<T> {
    return ApiResponseHelper.error(message, data, {
      code: 400,
      errors,
    });
  }

  public static unauthorized<T = any>(
    message: string,
    data?: T,
  ): ApiResponse<T> {
    return ApiResponseHelper.error(message, data, { code: 401 });
  }

  public static forbidden<T = any>(message: string, data?: T): ApiResponse<T> {
    return ApiResponseHelper.error(message, data, { code: 403 });
  }

  public static notFound<T = any>(message: string, data?: T): ApiResponse<T> {
    return ApiResponseHelper.error(message, data, { code: 404 });
  }

  public static conflict<T = any>(message: string, data?: T): ApiResponse<T> {
    return ApiResponseHelper.error(message, data, { code: 409 });
  }

  public static unprocessableEntity<T = any>(
    message: string,
    data?: T,
    errors?: any[],
  ): ApiResponse<T> {
    return ApiResponseHelper.error(message, data, {
      code: 422,
      errors,
    });
  }

  public static internalServerError<T = any>(
    message: string,
    data?: T,
  ): ApiResponse<T> {
    return ApiResponseHelper.error(message, data, { code: 500 });
  }

  // Pagination helper
  public static paginated<T = any>(
    message: string,
    data: T[],
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages?: number;
    },
  ): ApiResponse<T[]> {
    const totalPages = Math.ceil(meta.total / meta.limit);

    return {
      status: true,
      code: 200,
      message,
      data,
      meta: {
        page: meta.page,
        limit: meta.limit,
        total: meta.total,
        totalPages,
      },
      timestamp: new Date().toISOString(),
    };
  }
}

// Builder class for more complex responses
class ApiResponseBuilder<T = any> {
  private response: Partial<ApiResponse<T>> = {
    status: true,
    code: 200,
    timestamp: new Date().toISOString(),
  };

  withStatus(status: boolean): this {
    this.response.status = status;
    return this;
  }

  withCode(code: number): this {
    this.response.code = code;
    return this;
  }

  withMessage(message: string): this {
    this.response.message = message;
    return this;
  }

  withData(data: T): this {
    this.response.data = data;
    return this;
  }

  withTimestamp(timestamp: string): this {
    this.response.timestamp = timestamp;
    return this;
  }

  withPath(path: string): this {
    this.response.path = path;
    return this;
  }

  withErrors(errors: any[]): this {
    this.response.errors = errors;
    return this;
  }

  withMeta(meta: ApiResponse['meta']): this {
    this.response.meta = meta;
    return this;
  }

  build(): ApiResponse<T> {
    // Validate required fields
    if (!this.response.message) {
      throw new Error('Message is required');
    }

    return this.response as ApiResponse<T>;
  }
}

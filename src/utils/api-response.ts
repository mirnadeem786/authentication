export class AbstractApiResponse<T> {
    data: T | null;
    error: object | string | null;
    message: string;
    status: number;
  
    constructor(
      data: T | null,
      error: object | string | null,
      message: string,
      status: number,
    ) {
      this.data = data;
      this.error = error;
      this.message = message;
      this.status = status;
    }
  
    static success<T>(
      data: T,
      message = 'Success',
      status = 200,
      error = null,
    ): AbstractApiResponse<T> {
      return new AbstractApiResponse<T>(data, error, message, status);
    }
  
    static created<T>(
      data: T,
      message = 'Resource created',
      status = 201,
      error = null,
    ): AbstractApiResponse<T> {
      return new AbstractApiResponse<T>(data, error, message, status);
    }
  
    static failure<T>(
      error: object | string,
      message: string,
      status: number,
    ): AbstractApiResponse<T> {
      return new AbstractApiResponse<T>(null, error, message, status);
    }
  
    static accepted<T>(
      error: object | string,
      message: string,
      status: 202,
    ): AbstractApiResponse<T> {
      return new AbstractApiResponse<T>(null, error, message, status);
    }
  }
  
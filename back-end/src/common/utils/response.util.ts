export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface MessageResponse {
  success: true;
  message: string;
}

export function createSuccessResponse<T>(
  message: string,
  data: T
): ApiResponse<T> {
  return {
    success: true,
    message,
    data
  };
}

export function createMessageResponse(message: string): MessageResponse {
  return {
    success: true,
    message
  };
}

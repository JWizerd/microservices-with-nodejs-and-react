export interface ErrorItem {
  message: string;
  field?: string;
}

export interface ErrorResponse {
  errors: ErrorItem[]
}
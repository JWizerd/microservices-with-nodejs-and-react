export type RequestMethod = 'post' | 'put' | 'delete' | 'get' | 'patch';

export interface UseRequestOptions {
  url: string;
  method: RequestMethod;
  body: any
  onSuccess?: (data: any) => void
}
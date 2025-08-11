export interface ApiResponse<T> {
  status: string;
  data: T;
  errors?: { [key: string]: string };
}

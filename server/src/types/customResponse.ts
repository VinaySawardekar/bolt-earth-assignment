import { UserLoginResponseBody } from "./user";

export type SuccessResponse<T> = {
  status: string;
  message: string;
  data: T[] | UserLoginResponseBody[];
};

export type ErrorResponse = {
  status: string;
  message: string;
  error: any;
};

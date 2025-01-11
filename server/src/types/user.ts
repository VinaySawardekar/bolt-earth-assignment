export interface UserRequestBody {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserLoginRequestBody {
  username: string;
  password: string;
}

export interface UserLoginResponseBody {
  role: string;
  username: string;
  accessToken: string;
}

export interface RegisterRequestModel {
  name: string;
  login: string;
  password: string;
}

export interface LoginRequestModel {
  login: string;
  password: string;
}

export interface UserModel {
  id: string;
  login: string;
  password: string;
}

export interface TokenResponseModel {
  token: string;
}

export interface GetUserModel {
  id: string;
  name: string;
  login: string;
}

export interface ErrorModel {
  statusCode: number;
  message: string;
}

export interface ParsedToken {
  userId: string;
  login: string;
  iat: number;
}
